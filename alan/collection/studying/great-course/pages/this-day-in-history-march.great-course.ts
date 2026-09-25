import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const thisDayInHistoryMarch = {
  id: "019db533-f3a0-725d-b137-27d81b942ee7",
  type: "page-type/great-course",
  slug: "this-day-in-history-march",
  title: "This Day in History: March",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 69,
  ownProgress: 69,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "this-day-in-history-march",
      externalLink: "https://www.thegreatcoursesplus.com/this-day-in-history-march",
    },
  ],
} as const satisfies GreatCourse
