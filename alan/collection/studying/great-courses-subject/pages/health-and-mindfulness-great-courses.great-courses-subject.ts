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
} as const satisfies GreatCoursesSubject
