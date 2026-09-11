import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const advancedInvestments = {
  id: "019db533-f39e-7507-9d51-dbdc070cd64a",
  type: "great-course",
  slug: "advanced-investments",
  title: "Advanced Investments",
  status: "completed",
  rank: "D",
  unit: "minutes",
  ownLength: 766.2,
  ownProgress: 766.2,
  partOfCollections: ["all-great-courses", "business-and-finance-great-courses"],
  source: "the-great-courses",
  externalId: "advanced-investments",
  externalLink: "https://www.thegreatcoursesplus.com/advanced-investments",
} as const satisfies GreatCourse
