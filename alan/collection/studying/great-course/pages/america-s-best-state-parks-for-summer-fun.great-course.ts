import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const americaSBestStateParksForSummerFun = {
  id: "019db533-f39f-76d6-bf9e-e3b48ac3c330",
  type: "page-type/great-course",
  slug: "america-s-best-state-parks-for-summer-fun",
  title: "America’s Best State Parks for Summer Fun",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 10.2,
  ownProgress: 10.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "americas-best-state-parks-for-summer-fun",
      externalLink: "https://www.thegreatcoursesplus.com/americas-best-state-parks-for-summer-fun",
    },
  ],
} as const satisfies GreatCourse
