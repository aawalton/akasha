import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const thisDayInHistoryOctober = {
  id: "019db533-f39f-7c86-bd13-acde09554c64",
  type: "page-type/great-course",
  slug: "this-day-in-history-october",
  title: "This Day in History: October",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 75.6,
  ownProgress: 75.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "this-day-in-history-october",
      externalLink: "https://www.thegreatcoursesplus.com/this-day-in-history-october",
    },
  ],
} as const satisfies GreatCourse
