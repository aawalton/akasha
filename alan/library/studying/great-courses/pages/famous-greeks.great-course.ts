import type { GreatCourse } from "../great-course.page-type.ts"

export const famousGreeks = {
  id: "019db533-f3a0-717f-9c03-9ed983ccf9a5",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "famous-greeks",
  title: "Famous Greeks",
  status: "completed",
  rank: "C",
  unit: "minutes",
  ownLength: 736.8,
  ownProgress: 736.8,
  partOfCollections: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "famous-greeks",
  externalLink: "https://www.thegreatcoursesplus.com/famous-greeks",
} as const satisfies GreatCourse
