import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingRussiaACulturalHistory = {
  id: "019db533-f39f-7b48-b045-c37fccc8631f",
  type: "page-type/great-course",
  slug: "understanding-russia-a-cultural-history",
  title: "Understanding Russia: A Cultural History",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 759.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-russia-a-cultural-history",
      externalLink: "https://www.thegreatcoursesplus.com/understanding-russia-a-cultural-history",
    },
  ],
} as const satisfies GreatCourse
