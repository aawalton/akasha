import type { GreatCoursesCollection } from "akasha/alan/library/studying/great-courses-collections/great-courses-collection.page-type.types.ts"

export const greatCoursesBySubject = {
  id: "019db533-f3a0-7904-8834-705c6b3f7b7c",
  type: "great-courses-collection",
  slug: "great-courses-by-subject",
  title: "Great Courses by Subject",
  status: "in-progress",
  rank: "B",
  unit: "minutes",
  partOfCollections: ["the-great-courses"],
  source: "the-great-courses",
} as const satisfies GreatCoursesCollection
