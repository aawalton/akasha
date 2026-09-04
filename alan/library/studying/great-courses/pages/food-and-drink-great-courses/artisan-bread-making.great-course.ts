import type { GreatCourse } from "../../great-course.page-type.ts"

export const artisanBreadMaking = {
  id: "019db533-f39f-7b13-8f9a-e4fbbfc910b9",
  pageTypeSlug: "great-course",
  slug: "artisan-bread-making",
  title: "Artisan Bread Making",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 320.4,
  ownProgress: 320.4,
  partOfSlugs: [
    "all-great-courses",
    "food-and-drink-great-courses",
    "hobby-and-personal-pursuits-great-courses",
  ],
  source: "the-great-courses",
  externalId: "artisan-bread-making",
  externalLink: "https://www.thegreatcoursesplus.com/artisan-bread-making",
} as const satisfies GreatCourse
