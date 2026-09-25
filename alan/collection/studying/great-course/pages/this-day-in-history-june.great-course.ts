import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const thisDayInHistoryJune = {
  id: "019db533-f39f-7feb-a273-387f705675be",
  type: "page-type/great-course",
  slug: "this-day-in-history-june",
  title: "This Day in History: June",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 92.4,
  ownProgress: 92.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "this-day-in-history-june",
      externalLink: "https://www.thegreatcoursesplus.com/this-day-in-history-june",
    },
  ],
} as const satisfies GreatCourse
