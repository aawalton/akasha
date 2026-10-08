import type { GreatCoursesSubject } from "akasha/alan/collection/studying/great-courses-subject/great-courses-subject.page-type.types.ts"

export const musicGreatCourses = {
  id: "019db533-f3a0-7a0d-9877-22f25fcef2fa",
  type: "page-type/great-courses-subject",
  slug: "music-great-courses",
  title: "Music Great Courses",
  status: "paused",
  unit: "unit/minutes",
  partOfCollections: ["great-courses-collection/great-courses-by-subject"],
  externalIdentity: [{ source: "the-great-courses", externalId: "great-courses-subject-music" }],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCoursesSubject
