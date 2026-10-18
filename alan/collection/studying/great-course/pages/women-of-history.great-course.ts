import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const womenOfHistory = {
  id: "019db533-f39f-7ac8-b3ef-0a33ec6e95ef",
  type: "page-type/great-course",
  slug: "women-of-history",
  title: "Women of History",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 39,
  ownProgress: 39,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "women-of-history",
      externalLink: "https://plus.thegreatcourses.com/women-of-history",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
