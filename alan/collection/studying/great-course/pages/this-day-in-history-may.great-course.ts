import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const thisDayInHistoryMay = {
  id: "019db533-f3a0-7083-8641-36229d4ec767",
  type: "page-type/great-course",
  slug: "this-day-in-history-may",
  title: "This Day in History: May",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 81,
  ownProgress: 81,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "this-day-in-history-may",
      externalLink: "https://www.thegreatcoursesplus.com/this-day-in-history-may",
    },
  ],
} as const satisfies GreatCourse
