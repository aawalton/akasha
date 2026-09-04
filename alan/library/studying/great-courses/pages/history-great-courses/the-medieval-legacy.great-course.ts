import type { GreatCourse } from "../../great-course.page-type.ts"

export const theMedievalLegacy = {
  id: "019db533-f3a0-726b-8734-53b0e1ea95c9",
  pageTypeSlug: "great-course",
  slug: "the-medieval-legacy",
  title: "The Medieval Legacy",
  status: "completed",
  rank: "C",
  unitSlug: "minutes",
  ownLength: 1099.2,
  ownProgress: 1099.2,
  partOfSlugs: ["all-great-courses", "history-great-courses", "learning-paths-great-courses"],
  source: "the-great-courses",
  externalId: "the-medieval-legacy",
  externalLink: "https://www.thegreatcoursesplus.com/the-medieval-legacy",
} as const satisfies GreatCourse
