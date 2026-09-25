import type { GreatCoursesSubject } from "akasha/alan/collection/studying/great-courses-subject/great-courses-subject.page-type.types.ts"

export const literatureGreatCourses = {
  id: "019db533-f3a0-78fa-85c4-2718c7e1f879",
  type: "page-type/great-courses-subject",
  slug: "literature-great-courses",
  title: "Literature Great Courses",
  status: "paused",
  unit: "unit/minutes",
  partOfCollections: ["great-courses-collection/great-courses-by-subject"],
  externalIdentity: [
    { source: "the-great-courses", externalId: "great-courses-subject-literature" },
  ],
} as const satisfies GreatCoursesSubject
