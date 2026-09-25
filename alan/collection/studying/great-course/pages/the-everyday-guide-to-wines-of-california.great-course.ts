import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theEverydayGuideToWinesOfCalifornia = {
  id: "019db533-f39f-78d3-b382-cf21ecaec2c3",
  type: "page-type/great-course",
  slug: "the-everyday-guide-to-wines-of-california",
  title: "The Everyday Guide to Wines of California",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 195.6,
  ownProgress: 195.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-everyday-guide-to-wines-of-california",
      externalLink: "https://www.thegreatcoursesplus.com/the-everyday-guide-to-wines-of-california",
    },
  ],
} as const satisfies GreatCourse
