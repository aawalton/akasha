import type { GreatCoursesSubject } from "../great-courses-subject.page-type.ts"

export const scienceGreatCourses = {
  id: "019db533-f3a0-7a43-b894-122db619aaf3",
  pageTypeSlug: "great-courses-subject",
  slug: "science-great-courses",
  title: "Science Great Courses",
  status: "paused",
  unitSlug: "minutes",
  partOfSlugs: ["great-courses-by-subject"],
  source: "the-great-courses",
  externalId: "great-courses-subject-science",
} as const satisfies GreatCoursesSubject
