import type { GreatCourse } from "../../great-course.page-type.ts"

export const cookingBetterWithScience = {
  id: "019db533-f39f-7a3e-b69b-1b0bfacdd1cd",
  pageTypeSlug: "great-course",
  slug: "cooking-better-with-science",
  title: "Cooking Better with Science",
  status: "completed",
  rank: "C",
  unitSlug: "minutes",
  ownLength: 357.6,
  ownProgress: 357.6,
  partOfSlugs: ["all-great-courses", "food-and-drink-great-courses"],
  source: "the-great-courses",
  externalId: "cooking-better-with-science",
  externalLink: "https://www.thegreatcoursesplus.com/cooking-better-with-science",
} as const satisfies GreatCourse
