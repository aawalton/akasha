import type { GreatCoursesCollection } from "akasha/alan/collection/studying/great-courses-collection/great-courses-collection.page-type.types.ts"

export const allGreatCourses = {
  id: "019db533-f3a0-7a63-b9ab-779a6fce1df4",
  type: "page-type/great-courses-collection",
  slug: "all-great-courses",
  title: "All Great Courses",
  status: "in-progress",
  grade: "B",
  unit: "unit/minutes",
  partOfCollections: ["great-courses-collection/the-great-courses"],
} as const satisfies GreatCoursesCollection
