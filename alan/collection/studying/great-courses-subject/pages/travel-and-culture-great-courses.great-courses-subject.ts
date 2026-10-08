import type { GreatCoursesSubject } from "akasha/alan/collection/studying/great-courses-subject/great-courses-subject.page-type.types.ts"

export const travelAndCultureGreatCourses = {
  id: "019db533-f3a0-79a3-8c96-f5f17b9db70e",
  type: "page-type/great-courses-subject",
  slug: "travel-and-culture-great-courses",
  title: "Travel & Culture Great Courses",
  status: "following",
  grade: "B",
  unit: "unit/minutes",
  partOfCollections: ["great-courses-collection/great-courses-by-subject"],
  externalIdentity: [
    { source: "the-great-courses", externalId: "great-courses-subject-travel-culture" },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCoursesSubject
