import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theEverydayGuideToWine = {
  id: "019db533-f39f-7892-ac68-1d89c8812020",
  type: "page-type/great-course",
  slug: "the-everyday-guide-to-wine",
  title: "The Everyday Guide to Wine",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 752.4,
  ownProgress: 752.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-everyday-guide-to-wine",
      externalLink: "https://www.thegreatcoursesplus.com/the-everyday-guide-to-wine",
    },
  ],
} as const satisfies GreatCourse
