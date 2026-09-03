import type { GreatCourse } from "../../great-course.page-type.ts"

export const whatEinsteinGotWrong = {
  id: "019db533-f39e-7cf2-93eb-d8b68636f4cb",
  pageTypeSlug: "great-course",
  slug: "what-einstein-got-wrong",
  title: "What Einstein Got Wrong",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 345.6,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "what-einstein-got-wrong",
  externalLink: "https://www.thegreatcoursesplus.com/what-einstein-got-wrong",
} as const satisfies GreatCourse
