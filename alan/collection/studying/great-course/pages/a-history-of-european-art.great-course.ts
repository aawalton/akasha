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
      externalLink: "https://www.thegreatcoursesplus.com/a-history-of-european-art",
    },
  ],
} as const satisfies GreatCourse
