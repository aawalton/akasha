import type { GreatCourse } from "../../great-course.page-type.ts"

export const cakeDecorating = {
  id: "019db533-f39f-7abe-ad2b-3114d270e34f",
  pageTypeSlug: "great-course",
  slug: "cake-decorating",
  title: "Cake Decorating",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 302.4,
  ownProgress: 302.4,
  partOfSlugs: [
    "all-great-courses",
    "food-and-drink-great-courses",
    "hobby-and-personal-pursuits-great-courses",
  ],
  source: "the-great-courses",
  externalId: "cake-decorating",
  externalLink: "https://www.thegreatcoursesplus.com/cake-decorating",
} as const satisfies GreatCourse
