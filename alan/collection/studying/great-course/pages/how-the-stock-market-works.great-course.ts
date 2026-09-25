import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howTheStockMarketWorks = {
  id: "019db533-f39e-74b9-9da7-949da690979a",
  type: "page-type/great-course",
  slug: "how-the-stock-market-works",
  title: "How the Stock Market Works",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 555,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-the-stock-market-works",
      externalLink: "https://www.thegreatcoursesplus.com/how-the-stock-market-works",
    },
  ],
} as const satisfies GreatCourse
