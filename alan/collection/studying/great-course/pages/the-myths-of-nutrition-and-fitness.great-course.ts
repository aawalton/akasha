import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theMythsOfNutritionAndFitness = {
  id: "019db533-f3a0-75f4-8bd6-a95253f52bf0",
  type: "page-type/great-course",
  slug: "the-myths-of-nutrition-and-fitness",
  title: "The Myths of Nutrition and Fitness",
  status: "completed",
  unit: "unit/minutes",
  ownLength: 190.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-myths-of-nutrition-and-fitness",
      externalLink: "https://www.thegreatcoursesplus.com/the-myths-of-nutrition-and-fitness",
    },
  ],
} as const satisfies GreatCourse
