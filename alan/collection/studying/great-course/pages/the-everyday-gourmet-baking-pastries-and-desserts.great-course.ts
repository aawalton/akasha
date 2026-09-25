import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theEverydayGourmetBakingPastriesAndDesserts = {
  id: "019db533-f39f-78a8-9cd8-328c5cf42c87",
  type: "page-type/great-course",
  slug: "the-everyday-gourmet-baking-pastries-and-desserts",
  title: "The Everyday Gourmet: Baking Pastries and Desserts",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 232.2,
  ownProgress: 232.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-everyday-gourmet-baking-pastries-and-desserts",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-everyday-gourmet-baking-pastries-and-desserts",
    },
  ],
} as const satisfies GreatCourse
