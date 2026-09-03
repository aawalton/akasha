import type { GreatCourse } from "../../great-course.page-type.ts"

export const howTheStockMarketWorks = {
  id: "019db533-f39e-74b9-9da7-949da690979a",
  pageTypeSlug: "great-course",
  slug: "how-the-stock-market-works",
  title: "How the Stock Market Works",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 555,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "business-and-finance-great-courses"],
  source: "the-great-courses",
  externalId: "how-the-stock-market-works",
  externalLink: "https://www.thegreatcoursesplus.com/how-the-stock-market-works",
} as const satisfies GreatCourse
