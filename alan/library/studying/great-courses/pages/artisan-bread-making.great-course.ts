import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const artisanBreadMaking = {
  id: "019db533-f39f-7b13-8f9a-e4fbbfc910b9",
  type: "great-course",
  slug: "artisan-bread-making",
  title: "Artisan Bread Making",
  status: "completed",
  rank: "D",
  unit: "minutes",
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
      externalLink: "https://www.thegreatcoursesplus.com/artisan-bread-making",
    },
  ],
} as const satisfies GreatCourse
