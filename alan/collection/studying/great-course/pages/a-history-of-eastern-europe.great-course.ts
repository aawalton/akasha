import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const aHistoryOfEasternEurope = {
  id: "019db533-f39f-7ade-a1fb-d3818350d039",
  type: "page-type/great-course",
  slug: "a-history-of-eastern-europe",
  title: "A History of Eastern Europe",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 724.8,
  ownProgress: 724.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "a-history-of-eastern-europe",
      externalLink: "https://www.thegreatcoursesplus.com/a-history-of-eastern-europe",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
