import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureYourFantasticPlasticBrain = {
  id: "019db533-f39e-7e8e-9aa0-378a4447fe0f",
  type: "page-type/great-course",
  slug: "pilot-lecture-your-fantastic-plastic-brain",
  title: "Pilot Lecture: Your Fantastic Plastic Brain",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 29.4,
  ownProgress: 29.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "plus-pilots-your-fantastic-plastic-brain",
      externalLink: "https://www.thegreatcoursesplus.com/plus-pilots-your-fantastic-plastic-brain",
    },
  ],
} as const satisfies GreatCourse
