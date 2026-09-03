import type { GreatCoursesSubject } from "../great-courses-subject.page-type.ts"

export const literatureGreatCourses = {
  id: "019db533-f3a0-78fa-85c4-2718c7e1f879",
  pageTypeSlug: "great-courses-subject",
  slug: "literature-great-courses",
  title: "Literature Great Courses",
  status: "paused",
  unitSlug: "minutes",
  partOfSlugs: ["great-courses-by-subject"],
  source: "the-great-courses",
  externalId: "great-courses-subject-literature",
} as const satisfies GreatCoursesSubject
