import type { GreatCoursesSubject } from "../great-courses-subject.page-type.ts"

export const learningPathsGreatCourses = {
  id: "019db533-f3a0-7a18-9c54-28cdbd056cb8",
  pageTypeSlug: "great-courses-subject",
  slug: "learning-paths-great-courses",
  title: "Learning Paths Great Courses",
  status: "paused",
  unitSlug: "minutes",
  partOfSlugs: ["great-courses-by-subject"],
  source: "the-great-courses",
} as const satisfies GreatCoursesSubject
