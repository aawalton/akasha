import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const nutritionMadeClear = {
  id: "019db533-f3a0-77bc-a3b7-a62b47a8af1d",
  type: "page-type/great-course",
  slug: "nutrition-made-clear",
  title: "Nutrition Made Clear",
  status: "in-progress",
  unit: "unit/minutes",
  ownLength: 1115.4,
  ownProgress: 433.766667,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "lectures-and-courses-on-nutrition-understanding-nutrition",
      externalLink:
        "https://www.thegreatcoursesplus.com/lectures-and-courses-on-nutrition-understanding-nutrition",
    },
  ],
} as const satisfies GreatCourse
