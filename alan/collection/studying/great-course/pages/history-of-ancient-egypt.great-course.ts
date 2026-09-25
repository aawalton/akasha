import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const historyOfAncientEgypt = {
  id: "019db533-f3a0-715d-950c-30946de5a067",
  type: "page-type/great-course",
  slug: "history-of-ancient-egypt",
  title: "History of Ancient Egypt",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 1450.8,
  ownProgress: 1450.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "history-of-ancient-egypt",
      externalLink: "https://www.thegreatcoursesplus.com/history-of-ancient-egypt",
    },
  ],
} as const satisfies GreatCourse
