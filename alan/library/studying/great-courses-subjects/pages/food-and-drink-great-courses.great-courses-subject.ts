import type { GreatCoursesSubject } from "akasha/alan/library/studying/great-courses-subjects/great-courses-subject.page-type.types.ts"

export const foodAndDrinkGreatCourses = {
  id: "019db533-f3a0-78cf-8c7d-66f414c4c7af",
  type: "great-courses-subject",
  slug: "food-and-drink-great-courses",
  title: "Food & Drink Great Courses",
  status: "in-progress",
  rank: "C",
  unit: "minutes",
  partOfCollections: ["great-courses-by-subject"],
  source: "the-great-courses",
  externalId: "great-courses-subject-food-drink",
} as const satisfies GreatCoursesSubject
