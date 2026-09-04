import type { GreatCourse } from "../../great-course.page-type.ts"

export const shopEssentials = {
  id: "019db533-f39e-7657-86f5-a7d141ff0c72",
  pageTypeSlug: "great-course",
  slug: "shop-essentials",
  title: "Shop Essentials",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 201.6,
  ownProgress: 201.6,
  partOfSlugs: ["all-great-courses", "hobby-and-personal-pursuits-great-courses"],
  source: "the-great-courses",
  externalId: "shop-essentials",
  externalLink: "https://www.thegreatcoursesplus.com/shop-essentials",
} as const satisfies GreatCourse
