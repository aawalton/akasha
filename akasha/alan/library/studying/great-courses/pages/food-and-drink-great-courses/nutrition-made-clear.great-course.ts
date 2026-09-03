import type { GreatCourse } from "../../great-course.page-type.ts"

export const nutritionMadeClear = {
  id: "019db533-f3a0-77bc-a3b7-a62b47a8af1d",
  pageTypeSlug: "great-course",
  slug: "nutrition-made-clear",
  title: "Nutrition Made Clear",
  status: "in-progress",
  unitSlug: "minutes",
  ownLength: 1115.4,
  ownProgress: 433.766667,
  partOfSlugs: [
    "all-great-courses",
    "food-and-drink-great-courses",
    "health-and-mindfulness-great-courses",
    "science-great-courses",
  ],
  source: "the-great-courses",
  externalId: "lectures-and-courses-on-nutrition-understanding-nutrition",
  externalLink:
    "https://www.thegreatcoursesplus.com/lectures-and-courses-on-nutrition-understanding-nutrition",
} as const satisfies GreatCourse
