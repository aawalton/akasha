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
      externalLink: "https://plus.thegreatcourses.com/ask-the-expert",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
