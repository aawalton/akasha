import type { GreatCoursesCollection } from "../great-courses-collection.page-type.ts"

export const greatCoursesBySubject = {
  id: "019db533-f3a0-7904-8834-705c6b3f7b7c",
  pageTypeSlug: "great-courses-collection",
  slug: "great-courses-by-subject",
  title: "Great Courses by Subject",
  status: "in-progress",
  rank: "B",
  unitSlug: "minutes",
  partOfSlugs: ["the-great-courses"],
  source: "the-great-courses",
} as const satisfies GreatCoursesCollection
