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
} as const satisfies GreatCoursesCollection
