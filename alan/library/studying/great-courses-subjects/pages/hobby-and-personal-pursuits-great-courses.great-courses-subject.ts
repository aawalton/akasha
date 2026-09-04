import type { GreatCoursesSubject } from "../great-courses-subject.page-type.ts"

export const hobbyAndPersonalPursuitsGreatCourses = {
  id: "019db533-f3a0-79ce-96ad-9488b8f46397",
  pageTypeSlug: "great-courses-subject",
  slug: "hobby-and-personal-pursuits-great-courses",
  title: "Hobby & Personal Pursuits Great Courses",
  status: "paused",
  unitSlug: "minutes",
  partOfSlugs: ["great-courses-by-subject"],
  source: "the-great-courses",
  externalId: "great-courses-subject-hobby-personal-pursuits",
} as const satisfies GreatCoursesSubject
