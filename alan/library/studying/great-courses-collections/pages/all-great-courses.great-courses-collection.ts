import type { GreatCoursesCollection } from "akasha/alan/library/studying/great-courses-collections/great-courses-collection.page-type.types.ts"

export const allGreatCourses = {
  id: "019db533-f3a0-7a63-b9ab-779a6fce1df4",
  type: "great-courses-collection",
  slug: "all-great-courses",
  title: "All Great Courses",
  status: "in-progress",
  rank: "B",
  unit: "minutes",
  partOfCollections: ["the-great-courses"],
  source: "the-great-courses",
} as const satisfies GreatCoursesCollection
