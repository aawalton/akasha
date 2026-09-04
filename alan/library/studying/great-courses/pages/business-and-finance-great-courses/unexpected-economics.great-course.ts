import type { GreatCourse } from "../../great-course.page-type.ts"

export const unexpectedEconomics = {
  id: "019db533-f39e-732a-9c01-59a1dfffb29b",
  pageTypeSlug: "great-course",
  slug: "unexpected-economics",
  title: "Unexpected Economics",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 727.2,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "business-and-finance-great-courses"],
  source: "the-great-courses",
  externalId: "unexpected-economics",
  externalLink: "https://www.thegreatcoursesplus.com/unexpected-economics",
} as const satisfies GreatCourse
