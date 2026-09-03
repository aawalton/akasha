import type { GreatCoursesSubject } from "../great-courses-subject.page-type.ts"

export const historyGreatCourses = {
  id: "019db533-f3a0-7a22-85a8-57a480635bdd",
  pageTypeSlug: "great-courses-subject",
  slug: "history-great-courses",
  title: "History Great Courses",
  status: "paused",
  unitSlug: "minutes",
  partOfSlugs: ["great-courses-by-subject"],
  source: "the-great-courses",
  externalId: "great-courses-subject-history",
} as const satisfies GreatCoursesSubject
