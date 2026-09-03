import type { GreatCourse } from "../../great-course.page-type.ts"

export const algebraI = {
  id: "019db533-f3a0-749f-9bac-63eacc66429c",
  pageTypeSlug: "great-course",
  slug: "algebra-i",
  title: "Algebra I",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 1110.6,
  ownProgress: 1110.6,
  partOfSlugs: ["all-great-courses", "learning-paths-great-courses", "mathematics-great-courses"],
  source: "the-great-courses",
  externalId: "algebra-i",
  externalLink: "https://www.thegreatcoursesplus.com/algebra-i",
} as const satisfies GreatCourse
