import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theEverydayGuideToSpiritsAndCocktailsTastesAndTraditions = {
  id: "019db533-f39f-785d-a337-18fb425d4d6a",
  type: "page-type/great-course",
  slug: "the-everyday-guide-to-spirits-and-cocktails-tastes-and-traditions",
  title: "The Everyday Guide to Spirits and Cocktails: Tastes and Traditions",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 252,
  ownProgress: 252,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-everyday-guide-to-spirits-and-cocktails-tastes-and-traditions",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-everyday-guide-to-spirits-and-cocktails-tastes-and-traditions",
    },
  ],
} as const satisfies GreatCourse
