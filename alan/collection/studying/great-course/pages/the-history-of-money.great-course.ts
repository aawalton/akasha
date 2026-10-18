import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theHistoryOfMoney = {
  id: "019db533-f38a-7581-8548-0b92f99b188b",
  type: "page-type/great-course",
  slug: "the-history-of-money",
  title: "The History of Money",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 598.2,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-history-of-money",
      externalLink: "https://plus.thegreatcourses.com/the-history-of-money",
    },
  ],
  createdAt: "2026-04-22T12:39:34.026Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
