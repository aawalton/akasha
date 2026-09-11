import type { GreatCoursesSubject } from "akasha/alan/library/studying/great-courses-subjects/great-courses-subject.page-type.types.ts"

export const literatureGreatCourses = {
  id: "019db533-f3a0-78fa-85c4-2718c7e1f879",
  type: "great-courses-subject",
  slug: "literature-great-courses",
  title: "Literature Great Courses",
  status: "paused",
  unit: "minutes",
  partOfCollections: ["great-courses-by-subject"],
  source: "the-great-courses",
  externalId: "great-courses-subject-literature",
} as const satisfies GreatCoursesSubject
