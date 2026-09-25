import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const americaAndTheNewGlobalEconomy = {
  id: "019db533-f3a0-7162-916c-9845b4cb45c0",
  type: "page-type/great-course",
  slug: "america-and-the-new-global-economy",
  title: "America and the New Global Economy",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 1120.2,
  ownProgress: 1120.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "america-and-the-new-global-economy",
      externalLink: "https://www.thegreatcoursesplus.com/america-and-the-new-global-economy",
    },
  ],
} as const satisfies GreatCourse
