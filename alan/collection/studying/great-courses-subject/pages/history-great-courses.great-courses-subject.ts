import type { GreatCoursesSubject } from "akasha/alan/collection/studying/great-courses-subject/great-courses-subject.page-type.types.ts"

export const historyGreatCourses = {
  id: "019db533-f3a0-7a22-85a8-57a480635bdd",
  type: "page-type/great-courses-subject",
  slug: "history-great-courses",
  title: "History Great Courses",
  status: "paused",
  unit: "unit/minutes",
  partOfCollections: ["great-courses-collection/great-courses-by-subject"],
  externalIdentity: [{ source: "the-great-courses", externalId: "great-courses-subject-history" }],
} as const satisfies GreatCoursesSubject
