import type { GreatCoursesCollection } from "akasha/alan/collection/studying/great-courses-collection/great-courses-collection.page-type.types.ts"

export const greatCoursesBySubject = {
  id: "019db533-f3a0-7904-8834-705c6b3f7b7c",
  type: "page-type/great-courses-collection",
  slug: "great-courses-by-subject",
  title: "Great Courses by Subject",
  status: "in-progress",
  grade: "B",
  unit: "unit/minutes",
  partOfCollections: ["great-courses-collection/the-great-courses"],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCoursesCollection
