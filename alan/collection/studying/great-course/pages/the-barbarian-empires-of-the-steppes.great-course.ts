import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theBarbarianEmpiresOfTheSteppes = {
  id: "019db533-f3a0-71be-af1b-2680504f45e0",
  type: "page-type/great-course",
  slug: "the-barbarian-empires-of-the-steppes",
  title: "The Barbarian Empires of the Steppes",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 1107,
  ownProgress: 1107,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-barbarian-empires-of-the-steppes",
      externalLink: "https://www.thegreatcoursesplus.com/the-barbarian-empires-of-the-steppes",
    },
  ],
} as const satisfies GreatCourse
