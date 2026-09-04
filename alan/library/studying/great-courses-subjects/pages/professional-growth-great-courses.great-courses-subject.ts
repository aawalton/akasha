import type { GreatCoursesSubject } from "../great-courses-subject.page-type.ts"

export const professionalGrowthGreatCourses = {
  id: "019db533-f3a0-7919-abe7-39a5a3a7610b",
  pageTypeSlug: "great-courses-subject",
  slug: "professional-growth-great-courses",
  title: "Professional Growth Great Courses",
  status: "paused",
  unitSlug: "minutes",
  partOfSlugs: ["great-courses-by-subject"],
  source: "the-great-courses",
  externalId: "great-courses-subject-professional-growth",
} as const satisfies GreatCoursesSubject
