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
      externalLink: "https://plus.thegreatcourses.com/cooking-across-the-ages",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
