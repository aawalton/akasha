import type { GreatCoursesSubject } from "akasha/alan/collection/studying/great-courses-subject/great-courses-subject.page-type.types.ts"

export const scienceGreatCourses = {
  id: "019db533-f3a0-7a43-b894-122db619aaf3",
  type: "page-type/great-courses-subject",
  slug: "science-great-courses",
  title: "Science Great Courses",
  status: "paused",
  unit: "unit/minutes",
  partOfCollections: ["great-courses-collection/great-courses-by-subject"],
  externalIdentity: [{ source: "the-great-courses", externalId: "great-courses-subject-science" }],
} as const satisfies GreatCoursesSubject
