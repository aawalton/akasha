import type { GreatCoursesSubject } from "akasha/alan/library/studying/great-courses-subjects/great-courses-subject.page-type.types.ts"

export const mathematicsGreatCourses = {
  id: "019db533-f3a0-78ef-a6c9-559466c7ea69",
  type: "great-courses-subject",
  slug: "mathematics-great-courses",
  title: "Mathematics Great Courses",
  status: "paused",
  unit: "minutes",
  partOfCollections: ["great-courses-by-subject"],
  source: "the-great-courses",
  externalId: "great-courses-subject-mathematics",
} as const satisfies GreatCoursesSubject
