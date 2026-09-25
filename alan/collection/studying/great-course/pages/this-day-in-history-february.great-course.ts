import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const thisDayInHistoryFebruary = {
  id: "019db533-f3a0-7035-8c55-0e19d7f3cce9",
  type: "page-type/great-course",
  slug: "this-day-in-history-february",
  title: "This Day in History: February",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 84,
  ownProgress: 84,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "this-day-in-history-february",
      externalLink: "https://www.thegreatcoursesplus.com/this-day-in-history-february",
    },
  ],
} as const satisfies GreatCourse
