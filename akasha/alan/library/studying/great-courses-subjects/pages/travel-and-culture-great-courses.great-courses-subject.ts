import type { GreatCoursesSubject } from "../great-courses-subject.page-type.ts"

export const travelAndCultureGreatCourses = {
  id: "019db533-f3a0-79a3-8c96-f5f17b9db70e",
  pageTypeSlug: "great-courses-subject",
  slug: "travel-and-culture-great-courses",
  title: "Travel & Culture Great Courses",
  status: "following",
  rank: "B",
  unitSlug: "minutes",
  partOfSlugs: ["great-courses-by-subject"],
  source: "the-great-courses",
  externalId: "great-courses-subject-travel-culture",
} as const satisfies GreatCoursesSubject
