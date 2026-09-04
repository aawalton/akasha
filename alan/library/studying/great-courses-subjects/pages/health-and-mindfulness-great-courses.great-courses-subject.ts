import type { GreatCoursesSubject } from "../great-courses-subject.page-type.ts"

export const healthAndMindfulnessGreatCourses = {
  id: "019db533-f3a0-7983-be9f-bb90d7e9b418",
  pageTypeSlug: "great-courses-subject",
  slug: "health-and-mindfulness-great-courses",
  title: "Health & Mindfulness Great Courses",
  status: "paused",
  unitSlug: "minutes",
  partOfSlugs: ["great-courses-by-subject"],
  source: "the-great-courses",
  externalId: "great-courses-subject-health-mindfulness",
} as const satisfies GreatCoursesSubject
