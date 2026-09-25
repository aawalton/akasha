import type { GreatCoursesSubject } from "akasha/alan/collection/studying/great-courses-subject/great-courses-subject.page-type.types.ts"

export const learningPathsGreatCourses = {
  id: "019db533-f3a0-7a18-9c54-28cdbd056cb8",
  type: "page-type/great-courses-subject",
  slug: "learning-paths-great-courses",
  title: "Learning Paths Great Courses",
  status: "paused",
  unit: "unit/minutes",
  partOfCollections: ["great-courses-collection/great-courses-by-subject"],
} as const satisfies GreatCoursesSubject
