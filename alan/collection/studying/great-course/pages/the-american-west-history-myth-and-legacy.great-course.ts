import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theAmericanWestHistoryMythAndLegacy = {
  id: "019db533-f39f-7de4-b25b-c014790b3b5e",
  type: "page-type/great-course",
  slug: "the-american-west-history-myth-and-legacy",
  title: "The American West: History, Myth, and Legacy",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 727.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-american-west-history-myth-and-legacy",
      externalLink: "https://www.thegreatcoursesplus.com/the-american-west-history-myth-and-legacy",
    },
  ],
} as const satisfies GreatCourse
