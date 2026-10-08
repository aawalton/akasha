import type { GreatCoursesSubject } from "akasha/alan/collection/studying/great-courses-subject/great-courses-subject.page-type.types.ts"

export const hobbyAndPersonalPursuitsGreatCourses = {
  id: "019db533-f3a0-79ce-96ad-9488b8f46397",
  type: "page-type/great-courses-subject",
  slug: "hobby-and-personal-pursuits-great-courses",
  title: "Hobby & Personal Pursuits Great Courses",
  status: "paused",
  unit: "unit/minutes",
  partOfCollections: ["great-courses-collection/great-courses-by-subject"],
  externalIdentity: [
    { source: "the-great-courses", externalId: "great-courses-subject-hobby-personal-pursuits" },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCoursesSubject
