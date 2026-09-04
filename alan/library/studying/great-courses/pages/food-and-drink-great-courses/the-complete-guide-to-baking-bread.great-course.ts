import type { GreatCourse } from "../../great-course.page-type.ts"

export const theCompleteGuideToBakingBread = {
  id: "019db533-f39f-78de-8c53-339772613191",
  pageTypeSlug: "great-course",
  slug: "the-complete-guide-to-baking-bread",
  title: "The Complete Guide to Baking Bread",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 603,
  ownProgress: 603,
  partOfSlugs: [
    "all-great-courses",
    "food-and-drink-great-courses",
    "hobby-and-personal-pursuits-great-courses",
  ],
  source: "the-great-courses",
  externalId: "the-complete-guide-to-baking-bread",
  externalLink: "https://www.thegreatcoursesplus.com/the-complete-guide-to-baking-bread",
} as const satisfies GreatCourse
