import type { GreatCoursesSubject } from "akasha/alan/library/studying/great-courses-subjects/great-courses-subject.page-type.types.ts"

export const musicGreatCourses = {
  id: "019db533-f3a0-7a0d-9877-22f25fcef2fa",
  type: "great-courses-subject",
  slug: "music-great-courses",
  title: "Music Great Courses",
  status: "paused",
  unit: "minutes",
  partOfCollections: ["great-courses-by-subject"],
  source: "the-great-courses",
  externalId: "great-courses-subject-music",
} as const satisfies GreatCoursesSubject
