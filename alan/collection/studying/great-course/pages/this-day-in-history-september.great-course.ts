import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const thisDayInHistorySeptember = {
  id: "019db533-f39f-7bf3-b3e6-07de3815eb2e",
  type: "page-type/great-course",
  slug: "this-day-in-history-september",
  title: "This Day in History: September",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 61.8,
  ownProgress: 61.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "this-day-in-history-september",
      externalLink: "https://www.thegreatcoursesplus.com/this-day-in-history-september",
    },
  ],
} as const satisfies GreatCourse
