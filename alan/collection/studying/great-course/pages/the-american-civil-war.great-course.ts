import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theAmericanCivilWar = {
  id: "019db533-f3a0-7096-a9ff-6f9839ab1be3",
  type: "page-type/great-course",
  slug: "the-american-civil-war",
  title: "The American Civil War",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 1461,
  ownProgress: 1461,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-american-civil-war",
      externalLink: "https://www.thegreatcoursesplus.com/the-american-civil-war",
    },
  ],
} as const satisfies GreatCourse
