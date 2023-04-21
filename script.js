import data from "./data.json" assert { type: "json" };

let body = document.body;
let jobsArray = [];

data.forEach((job) => {
  jobsArray.push(job);
});

function renderJobs(data) {
  let filter = document.querySelector(".filter");
  if (filter) {
    while (filter.nextElementSibling) {
      filter.nextElementSibling.remove();
    }
  }
  data.forEach((job) => {
    let jobFragment = document.createDocumentFragment();

    let jobCard = document.createElement("section");
    jobCard.classList.add("job");

    let logo = document.createElement("div");
    logo.classList.add("logo");
    logo.style.backgroundImage = `url(${job.logo})`;

    jobCard.append(logo);

    let job_description_parent = document.createElement("div");
    job_description_parent.classList.add("job_description_parent");

    let header = document.createElement("div");
    header.classList.add("header");

    let companyName = document.createElement("span");

    companyName.classList.add("company-name");
    companyName.textContent = job.company;

    header.append(companyName);

    if (job.new) {
      let isNew = document.createElement("span");
      isNew.classList.add("feat", "new");
      isNew.textContent = "new!";
      header.append(isNew);
    }

    if (job.featured) {
      let isFeatured = document.createElement("span");
      isFeatured.classList.add("feat", "featured");
      isFeatured.textContent = "featured";
      jobCard.style.borderLeft = `5px solid ${`#5CA5A5`}`;
      header.append(isFeatured);
    }

    job_description_parent.append(header);

    let position = document.createElement("div");
    position.classList.add("position");
    let positionSpan = document.createElement("span");
    positionSpan.textContent = job.position;
    position.append(positionSpan);
    job_description_parent.append(position);

    let description = document.createElement("div");
    description.classList.add("description");

    let ulDescription = document.createElement("ul");

    ulDescription.innerHTML = `<li>${job.postedAt}</li>
    <li>${job.contract}</li>
    <li>${job.location}</li>`;

    description.append(ulDescription);
    job_description_parent.append(description);

    jobCard.append(job_description_parent);
    jobFragment.append(jobCard);
    body.append(jobFragment);

    let skills_Bottom_filter = document.createElement("div");
    skills_Bottom_filter.classList.add("filter-skills-bottom");

    let skillsToRender = ["languages", "tools"];
    let role_and_position_Render = ["role", "level"];

    for (let key of role_and_position_Render) {
      let skill_bottom = document.createElement("div");
      skill_bottom.classList.add("skill-bottom");

      let roleSpan = document.createElement("span");
      roleSpan.textContent = job[key];

      skill_bottom.append(roleSpan);
      skills_Bottom_filter.append(skill_bottom);
      jobCard.append(skills_Bottom_filter);
    }

    for (let key of skillsToRender) {
      for (let value of job[key]) {
        let skill_bottom = document.createElement("div");
        skill_bottom.classList.add("skill-bottom");

        let roleSpan = document.createElement("span");
        roleSpan.textContent = value;

        skill_bottom.append(roleSpan);
        skills_Bottom_filter.append(skill_bottom);
        jobCard.append(skills_Bottom_filter);
      }
    }
  });
}

let skillsToFilter = [];

let onclickSkillRender = () => {
  if (skillsToFilter.length > 0) {
    filterSection.style.display = "flex";
  } else {
    filterSection.style.display = "none";
    firstJobCard.style.marginTop = "20.12rem";
  }

  body.addEventListener("click", (event) => {
    if (event.target.parentElement.matches(".skill-bottom")) {
      let target = event.target.textContent;
      console.log(target);

      let index = skillsToFilter.indexOf(target);

      if (index === -1) {
        skillsToFilter.push(target);

        console.log(skillsToFilter);

        console.log(skillsToFilter.length);

        let skills = document.createElement("div");
        skills.classList.add("skill");
        let skillSpan = document.createElement("span");
        skillSpan.textContent = target;
        let iconRemove = document.createElement("div");
        iconRemove.classList.add("icon-remove");
        let removeImg = document.createElement("img");
        removeImg.src = "./images/icon-remove.svg";
        iconRemove.append(removeImg);
        skills.append(skillSpan);
        skills.append(iconRemove);
        filter_skill.append(skills);
      } else {
        event.stopPropagation;
      }
      let filteredArray = filterArrays();
      jobCard.forEach((card) => {
        card.remove();
      });
      render_filter_section();
      renderJobs(filteredArray);
    }
  });
};

let render_filter_section = () => {
  if (skillsToFilter.length > 0) {
    filterSection.style.display = "flex";
    filterSection.style.visibility = "visible";
    firstJobCard.style.marginTop = "5.6rem";
  } else {
    filterSection.style.visibility = "hidden";
  }
};

let filterArrays = () => {
  let filteredArray = jobsArray.filter((job) => {
    return skillsToFilter.every((skill) => {
      return [job.role, job.level, ...job.languages, ...job.tools].includes(
        skill,
      );
    });
  });
  return filteredArray;
};

renderJobs(jobsArray);

let filterSection = document.querySelector(".filter");
let firstJobCard = document.querySelector(".job:nth-of-type(1)");

let filter_skill = document.querySelector(".filter-skills");
let jobCard = document.querySelectorAll(".job");
let skill = document.querySelector(".skill");
let clear = document.querySelector(".clear");

clear.addEventListener("click", () => {
  skillsToFilter.splice(0, skillsToFilter.length);

  filter_skill.innerHTML = "";

  filterSection.style.visibility = "hidden";

  renderJobs(jobsArray);
});

onclickSkillRender();

let icon = document.querySelector(".icon-remove");

function removeOnClick() {
  body.addEventListener("click", (e) => {
    if (e.target.matches(".icon-remove img ")) {
      let text = e.target.parentElement.parentElement.textContent;

      let index = skillsToFilter.indexOf(text);

      skillsToFilter.splice(index, 1);

      e.target.parentElement.parentElement.remove();

      if (skillsToFilter.length < 1) {
        filterSection.style.visibility = "hidden";
        jobCard.forEach((card) => {});
      }

      let filteredArr = filterArrays();

      renderJobs(filteredArr);
    }
  });
}

removeOnClick();
