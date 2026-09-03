import type { GreatCoursesSubject } from "../great-courses-subject.page-type.ts"

export const mathematicsGreatCourses = {
  id: "019db533-f3a0-78ef-a6c9-559466c7ea69",
  pageTypeSlug: "great-courses-subject",
  slug: "mathematics-great-courses",
  title: "Mathematics Great Courses",
  status: "paused",
  unitSlug: "minutes",
  partOfSlugs: ["great-courses-by-subject"],
  source: "the-great-courses",
  externalId: "great-courses-subject-mathematics",
} as const satisfies GreatCoursesSubject
