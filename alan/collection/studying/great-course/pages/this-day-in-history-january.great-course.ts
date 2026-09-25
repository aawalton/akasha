import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const thisDayInHistoryJanuary = {
  id: "019db533-f39f-7be9-bd5b-8d1021723a17",
  type: "page-type/great-course",
  slug: "this-day-in-history-january",
  title: "This Day in History: January",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 76.8,
  ownProgress: 76.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "this-day-in-history-january",
      externalLink: "https://www.thegreatcoursesplus.com/this-day-in-history-january",
    },
  ],
} as const satisfies GreatCourse
