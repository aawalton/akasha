import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const cookingAcrossTheAges = {
  id: "019db533-f39f-7a1e-8c5c-ae144817e45e",
  type: "page-type/great-course",
  slug: "cooking-across-the-ages",
  title: "Cooking across the Ages",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 791.4,
  ownProgress: 791.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "cooking-across-the-ages",
      externalLink: "https://www.thegreatcoursesplus.com/cooking-across-the-ages",
    },
  ],
} as const satisfies GreatCourse
