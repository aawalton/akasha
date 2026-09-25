import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingJapanACulturalHistory = {
  id: "019db533-f39f-77fd-8ce3-d2924442dc19",
  type: "page-type/great-course",
  slug: "understanding-japan-a-cultural-history",
  title: "Understanding Japan: A Cultural History",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 726.6,
  ownProgress: 726.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-japan-a-cultural-history",
      externalLink: "https://www.thegreatcoursesplus.com/understanding-japan-a-cultural-history",
    },
  ],
} as const satisfies GreatCourse
