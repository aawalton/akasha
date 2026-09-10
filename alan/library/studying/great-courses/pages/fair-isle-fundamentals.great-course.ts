import type { GreatCourse } from "../great-course.page-type.types.ts"

export const fairIsleFundamentals = {
  id: "019db533-f39e-76e2-ad3c-aaf06f68e6e3",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "fair-isle-fundamentals",
  title: "Fair Isle Fundamentals",
  status: "completed",
  rank: "D",
  unit: "minutes",
  ownLength: 116.4,
  ownProgress: 116.4,
  partOfCollections: ["all-great-courses", "hobby-and-personal-pursuits-great-courses"],
  source: "the-great-courses",
  externalId: "fair-isle-fundamentals",
  externalLink: "https://www.thegreatcoursesplus.com/fair-isle-fundamentals",
} as const satisfies GreatCourse
