import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const thisDayInHistoryJuly = {
  id: "019db533-f39f-7bb3-bf5e-f0619799f85a",
  type: "page-type/great-course",
  slug: "this-day-in-history-july",
  title: "This Day in History: July",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 81.6,
  ownProgress: 81.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "this-day-in-history-july",
      externalLink: "https://www.thegreatcoursesplus.com/this-day-in-history-july",
    },
  ],
} as const satisfies GreatCourse
