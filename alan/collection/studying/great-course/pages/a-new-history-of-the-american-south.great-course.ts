import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const aNewHistoryOfTheAmericanSouth = {
  id: "019db533-f39f-7f97-9727-de4c55ebca91",
  type: "page-type/great-course",
  slug: "a-new-history-of-the-american-south",
  title: "A New History of the American South",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 652.8,
  ownProgress: 652.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "a-new-history-of-the-american-south",
      externalLink: "https://www.thegreatcoursesplus.com/a-new-history-of-the-american-south",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
