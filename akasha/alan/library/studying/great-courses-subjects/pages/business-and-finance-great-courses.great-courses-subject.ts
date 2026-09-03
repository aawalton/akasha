import type { GreatCoursesSubject } from "../great-courses-subject.page-type.ts"

export const businessAndFinanceGreatCourses = {
  id: "019db533-f3a0-78e5-99ec-525da754f01a",
  pageTypeSlug: "great-courses-subject",
  slug: "business-and-finance-great-courses",
  title: "Business & Finance Great Courses",
  status: "paused",
  unitSlug: "minutes",
  partOfSlugs: ["great-courses-by-subject"],
  source: "the-great-courses",
  externalId: "great-courses-subject-business-finance",
} as const satisfies GreatCoursesSubject
