import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const elevateYourEverydayCookingWithCurtisStone = {
  id: "019db533-f39f-79de-ad6d-2c7849746eed",
  type: "page-type/great-course",
  slug: "elevate-your-everyday-cooking-with-curtis-stone",
  title: "Elevate Your Everyday Cooking with Curtis Stone",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 276.6,
  ownProgress: 276.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "elevate-your-everyday-cooking-with-curtis-stone",
      externalLink:
        "https://www.thegreatcoursesplus.com/elevate-your-everyday-cooking-with-curtis-stone",
    },
  ],
} as const satisfies GreatCourse
