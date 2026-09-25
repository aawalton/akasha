import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingTheWorldOfFinancialMarkets = {
  id: "019db533-f39e-72e9-adab-3d81a6f1f36e",
  type: "page-type/great-course",
  slug: "understanding-the-world-of-financial-markets",
  title: "Understanding the World of Financial Markets",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 308.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-the-world-of-financial-markets",
      externalLink:
        "https://www.thegreatcoursesplus.com/understanding-the-world-of-financial-markets",
    },
  ],
} as const satisfies GreatCourse
