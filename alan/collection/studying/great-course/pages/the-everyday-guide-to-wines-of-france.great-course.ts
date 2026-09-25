import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theEverydayGuideToWinesOfFrance = {
  id: "019db533-f39f-79d3-92aa-952ab04a3990",
  type: "page-type/great-course",
  slug: "the-everyday-guide-to-wines-of-france",
  title: "The Everyday Guide to Wines of France",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 213,
  ownProgress: 213,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-everyday-guide-to-wines-of-france",
      externalLink: "https://www.thegreatcoursesplus.com/the-everyday-guide-to-wines-of-france",
    },
  ],
} as const satisfies GreatCourse
