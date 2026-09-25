import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const cookingBetterWithScience = {
  id: "019db533-f39f-7a3e-b69b-1b0bfacdd1cd",
  type: "page-type/great-course",
  slug: "cooking-better-with-science",
  title: "Cooking Better with Science",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 357.6,
  ownProgress: 357.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "cooking-better-with-science",
      externalLink: "https://www.thegreatcoursesplus.com/cooking-better-with-science",
    },
  ],
} as const satisfies GreatCourse
