import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theEverydayGourmetCookingWithVegetables = {
  id: "019db533-f39f-789d-8387-8b58081db5fc",
  type: "page-type/great-course",
  slug: "the-everyday-gourmet-cooking-with-vegetables",
  title: "The Everyday Gourmet: Cooking with Vegetables",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 846.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-everyday-gourmet-cooking-with-vegetables",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-everyday-gourmet-cooking-with-vegetables",
    },
  ],
} as const satisfies GreatCourse
