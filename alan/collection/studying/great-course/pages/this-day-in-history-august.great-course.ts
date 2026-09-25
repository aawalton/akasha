import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const thisDayInHistoryAugust = {
  id: "019db533-f3a0-7074-86b7-82984225a103",
  type: "page-type/great-course",
  slug: "this-day-in-history-august",
  title: "This Day in History: August",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 97.8,
  ownProgress: 97.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "this-day-in-history-august",
      externalLink: "https://www.thegreatcoursesplus.com/this-day-in-history-august",
    },
  ],
} as const satisfies GreatCourse
