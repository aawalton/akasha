import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const historyOfTheSupremeCourt = {
  id: "019db533-f39f-7f56-a85a-048fdd8b49f0",
  type: "page-type/great-course",
  slug: "history-of-the-supreme-court",
  title: "History of the Supreme Court",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 1089,
  ownProgress: 1089,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "history-of-the-supreme-court",
      externalLink: "https://www.thegreatcoursesplus.com/history-of-the-supreme-court",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
