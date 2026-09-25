import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const thisDayInHistoryDecember = {
  id: "019db533-f3a0-7020-8173-bc325449b003",
  type: "page-type/great-course",
  slug: "this-day-in-history-december",
  title: "This Day in History: December",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 59.4,
  ownProgress: 59.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "this-day-in-history-december",
      externalLink: "https://www.thegreatcoursesplus.com/this-day-in-history-december",
    },
  ],
} as const satisfies GreatCourse
