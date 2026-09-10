import type { GreatCourse } from "../great-course.page-type.types.ts"

export const unexpectedEconomics = {
  id: "019db533-f39e-732a-9c01-59a1dfffb29b",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "unexpected-economics",
  title: "Unexpected Economics",
  status: "not-started",
  unit: "minutes",
  ownLength: 727.2,
  ownProgress: 0,
  partOfCollections: ["all-great-courses", "business-and-finance-great-courses"],
  source: "the-great-courses",
  externalId: "unexpected-economics",
  externalLink: "https://www.thegreatcoursesplus.com/unexpected-economics",
} as const satisfies GreatCourse
