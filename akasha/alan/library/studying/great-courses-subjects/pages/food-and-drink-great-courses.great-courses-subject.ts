import type { GreatCoursesSubject } from "../great-courses-subject.page-type.ts"

export const foodAndDrinkGreatCourses = {
  id: "019db533-f3a0-78cf-8c7d-66f414c4c7af",
  pageTypeSlug: "great-courses-subject",
  slug: "food-and-drink-great-courses",
  title: "Food & Drink Great Courses",
  status: "in-progress",
  rank: "C",
  unitSlug: "minutes",
  partOfSlugs: ["great-courses-by-subject"],
  source: "the-great-courses",
  externalId: "great-courses-subject-food-drink",
} as const satisfies GreatCoursesSubject
