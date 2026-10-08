import type { GreatCoursesSubject } from "akasha/alan/collection/studying/great-courses-subject/great-courses-subject.page-type.types.ts"

export const artGreatCourses = {
  id: "019db533-f3a0-7a03-8eb1-400a53db0d75",
  type: "page-type/great-courses-subject",
  slug: "art-great-courses",
  title: "Art Great Courses",
  status: "following",
  grade: "C",
  unit: "unit/minutes",
  partOfCollections: ["great-courses-collection/great-courses-by-subject"],
  externalIdentity: [{ source: "the-great-courses", externalId: "great-courses-subject-art" }],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCoursesSubject
