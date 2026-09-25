import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theEverydayGourmetMakingHealthyFoodTasteGreat = {
  id: "019db533-f39f-7888-9b13-bd3d6e1217d9",
  type: "page-type/great-course",
  slug: "the-everyday-gourmet-making-healthy-food-taste-great",
  title: "The Everyday Gourmet: Making Healthy Food Taste Great",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 198.6,
  ownProgress: 198.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-everyday-gourmet-making-healthy-food-taste-great",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-everyday-gourmet-making-healthy-food-taste-great",
    },
  ],
} as const satisfies GreatCourse
