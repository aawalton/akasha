import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const aHistoryOfEuropeanArt = {
  id: "019db533-f39f-765f-a190-3940beffa014",
  type: "page-type/great-course",
  slug: "a-history-of-european-art",
  title: "A History of European Art",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 1452,
  ownProgress: 1452,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "a-history-of-european-art",
      externalLink: "https://plus.thegreatcourses.com/a-history-of-european-art",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
