import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const peoplesAndCulturesOfTheWorld = {
  id: "019db533-f39f-7933-a5e7-bc34f881af6c",
  type: "page-type/great-course",
  slug: "peoples-and-cultures-of-the-world",
  title: "Peoples and Cultures of the World",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 723.6,
  ownProgress: 723.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "peoples-and-cultures-of-the-world",
      externalLink: "https://www.thegreatcoursesplus.com/peoples-and-cultures-of-the-world",
    },
  ],
} as const satisfies GreatCourse
