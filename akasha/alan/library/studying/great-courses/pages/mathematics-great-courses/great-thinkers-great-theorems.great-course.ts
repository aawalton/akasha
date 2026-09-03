import type { GreatCourse } from "../../great-course.page-type.ts"

export const greatThinkersGreatTheorems = {
  id: "019db533-f3a0-7a2d-98a9-9a2ca25241cc",
  pageTypeSlug: "great-course",
  slug: "great-thinkers-great-theorems",
  title: "Great Thinkers, Great Theorems",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 734.4,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "mathematics-great-courses"],
  source: "the-great-courses",
  externalId: "great-thinkers-great-theorems",
  externalLink: "https://www.thegreatcoursesplus.com/great-thinkers-great-theorems",
} as const satisfies GreatCourse
