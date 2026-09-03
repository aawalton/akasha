import type { GreatCoursesCollection } from "../great-courses-collection.page-type.ts"

export const allGreatCourses = {
  id: "019db533-f3a0-7a63-b9ab-779a6fce1df4",
  pageTypeSlug: "great-courses-collection",
  slug: "all-great-courses",
  title: "All Great Courses",
  status: "in-progress",
  rank: "B",
  unitSlug: "minutes",
  partOfSlugs: ["the-great-courses"],
  source: "the-great-courses",
} as const satisfies GreatCoursesCollection
