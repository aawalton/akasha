import type { GreatCoursesSubject } from "../great-courses-subject.page-type.ts"

export const artGreatCourses = {
  id: "019db533-f3a0-7a03-8eb1-400a53db0d75",
  pageTypeSlug: "great-courses-subject",
  slug: "art-great-courses",
  title: "Art Great Courses",
  status: "following",
  rank: "C",
  unitSlug: "minutes",
  partOfSlugs: ["great-courses-by-subject"],
  source: "the-great-courses",
  externalId: "great-courses-subject-art",
} as const satisfies GreatCoursesSubject
