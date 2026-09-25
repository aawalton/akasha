import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theEverydayGourmetEssentialSecretsOfSpicesInCooking = {
  id: "019db533-f39f-79b3-9d14-af884f913fae",
  type: "page-type/great-course",
  slug: "the-everyday-gourmet-essential-secrets-of-spices-in-cooking",
  title: "The Everyday Gourmet: Essential Secrets of Spices in Cooking",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 195.6,
  ownProgress: 195.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-everyday-gourmet-essential-secrets-of-spices-in-cooking",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-everyday-gourmet-essential-secrets-of-spices-in-cooking",
    },
  ],
} as const satisfies GreatCourse
