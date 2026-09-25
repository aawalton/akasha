import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const thisDayInHistoryNovember = {
  id: "019db533-f39f-7cc6-bbb5-cd8e012fbb0e",
  type: "page-type/great-course",
  slug: "this-day-in-history-november",
  title: "This Day in History: November",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 67.8,
  ownProgress: 67.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "this-day-in-history-november",
      externalLink: "https://www.thegreatcoursesplus.com/this-day-in-history-november",
    },
  ],
} as const satisfies GreatCourse
