import type { GreatCourse } from "../../great-course.page-type.ts"

export const algebraIi = {
  id: "019db533-f3a0-7959-968d-ffca4a13cff2",
  pageTypeSlug: "great-course",
  slug: "algebra-ii",
  title: "Algebra II",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 1120.8,
  ownProgress: 1120.8,
  partOfSlugs: ["all-great-courses", "learning-paths-great-courses", "mathematics-great-courses"],
  source: "the-great-courses",
  externalId: "algebra-ii",
  externalLink: "https://www.thegreatcoursesplus.com/algebra-ii",
} as const satisfies GreatCourse
