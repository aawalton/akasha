import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theEverydayGuideToWinesOfItaly = {
  id: "019db533-f39f-793e-9748-31d6424798fb",
  type: "page-type/great-course",
  slug: "the-everyday-guide-to-wines-of-italy",
  title: "The Everyday Guide to Wines of Italy",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 209.4,
  ownProgress: 209.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-everyday-guide-to-wines-of-italy",
      externalLink: "https://www.thegreatcoursesplus.com/the-everyday-guide-to-wines-of-italy",
    },
  ],
} as const satisfies GreatCourse
