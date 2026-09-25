import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const askTheExpert = {
  id: "019db533-f39f-737c-a7a8-45055b15e9ae",
  type: "page-type/great-course",
  slug: "ask-the-expert",
  title: "Ask the Expert",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 52.8,
  ownProgress: 52.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "ask-the-expert",
      externalLink: "https://www.thegreatcoursesplus.com/ask-the-expert",
    },
  ],
} as const satisfies GreatCourse
