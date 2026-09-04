import type { GreatCourse } from "../../great-course.page-type.ts"

export const cookingAcrossTheAges = {
  id: "019db533-f39f-7a1e-8c5c-ae144817e45e",
  pageTypeSlug: "great-course",
  slug: "cooking-across-the-ages",
  title: "Cooking across the Ages",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 791.4,
  ownProgress: 791.4,
  partOfSlugs: ["all-great-courses", "food-and-drink-great-courses"],
  source: "the-great-courses",
  externalId: "cooking-across-the-ages",
  externalLink: "https://www.thegreatcoursesplus.com/cooking-across-the-ages",
} as const satisfies GreatCourse
