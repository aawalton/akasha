import type { GreatCoursesSubject } from "../great-courses-subject.page-type.ts"

export const musicGreatCourses = {
  id: "019db533-f3a0-7a0d-9877-22f25fcef2fa",
  pageTypeSlug: "great-courses-subject",
  slug: "music-great-courses",
  title: "Music Great Courses",
  status: "paused",
  unitSlug: "minutes",
  partOfSlugs: ["great-courses-by-subject"],
  source: "the-great-courses",
  externalId: "great-courses-subject-music",
} as const satisfies GreatCoursesSubject
