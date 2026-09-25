import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theDecisiveBattlesOfWorldHistory = {
  id: "019db533-f39f-7908-8d0e-3c7888858306",
  type: "page-type/great-course",
  slug: "the-decisive-battles-of-world-history",
  title: "The Decisive Battles of World History",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 1113.6,
  ownProgress: 1113.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-decisive-battles-of-world-history",
      externalLink: "https://www.thegreatcoursesplus.com/the-decisive-battles-of-world-history",
    },
  ],
} as const satisfies GreatCourse
