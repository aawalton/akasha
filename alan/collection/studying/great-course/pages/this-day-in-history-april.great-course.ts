import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const thisDayInHistoryApril = {
  id: "019db533-f39f-781d-ab3a-d57be1c6f4ad",
  type: "page-type/great-course",
  slug: "this-day-in-history-april",
  title: "This Day in History: April",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 88.2,
  ownProgress: 88.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "this-day-in-history-april",
      externalLink: "https://www.thegreatcoursesplus.com/this-day-in-history-april",
    },
  ],
} as const satisfies GreatCourse
