import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howToGrowAnythingFoodGardeningForEveryone = {
  id: "019db533-f39f-7988-be0d-bd3ce595ab2f",
  type: "page-type/great-course",
  slug: "how-to-grow-anything-food-gardening-for-everyone",
  title: "How to Grow Anything: Food Gardening for Everyone",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 363,
  ownProgress: 363,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-to-grow-anything-food-gardening-for-everyone",
      externalLink:
        "https://www.thegreatcoursesplus.com/how-to-grow-anything-food-gardening-for-everyone",
    },
  ],
} as const satisfies GreatCourse
