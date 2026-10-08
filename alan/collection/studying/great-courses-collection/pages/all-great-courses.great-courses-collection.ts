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
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCoursesCollection
