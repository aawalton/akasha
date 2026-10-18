import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theCompleteGuideToBakingBread = {
  id: "019db533-f39f-78de-8c53-339772613191",
  type: "page-type/great-course",
  slug: "the-complete-guide-to-baking-bread",
  title: "The Complete Guide to Baking Bread",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 603,
  ownProgress: 603,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-complete-guide-to-baking-bread",
      externalLink: "https://plus.thegreatcourses.com/the-complete-guide-to-baking-bread",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
