import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const artisanBreadMaking = {
  id: "019db533-f39f-7b13-8f9a-e4fbbfc910b9",
  type: "page-type/great-course",
  slug: "artisan-bread-making",
  title: "Artisan Bread Making",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 320.4,
  ownProgress: 320.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "artisan-bread-making",
      externalLink: "https://plus.thegreatcourses.com/artisan-bread-making",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
