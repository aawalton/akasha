import type { GreatCoursesSubject } from "akasha/alan/collection/studying/great-courses-subject/great-courses-subject.page-type.types.ts"

export const healthAndMindfulnessGreatCourses = {
  id: "019db533-f3a0-7983-be9f-bb90d7e9b418",
  type: "page-type/great-courses-subject",
  slug: "health-and-mindfulness-great-courses",
  title: "Health & Mindfulness Great Courses",
  status: "paused",
  unit: "unit/minutes",
  partOfCollections: ["great-courses-collection/great-courses-by-subject"],
  externalIdentity: [
    { source: "the-great-courses", externalId: "great-courses-subject-health-mindfulness" },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCoursesSubject
