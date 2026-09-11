import type { GreatCoursesSubject } from "akasha/alan/library/studying/great-courses-subjects/great-courses-subject.page-type.types.ts"

export const learningPathsGreatCourses = {
  id: "019db533-f3a0-7a18-9c54-28cdbd056cb8",
  type: "great-courses-subject",
  slug: "learning-paths-great-courses",
  title: "Learning Paths Great Courses",
  status: "paused",
  unit: "minutes",
  partOfCollections: ["great-courses-by-subject"],
  source: "the-great-courses",
} as const satisfies GreatCoursesSubject
