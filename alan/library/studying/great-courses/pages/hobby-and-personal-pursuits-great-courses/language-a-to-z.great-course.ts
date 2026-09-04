import type { GreatCourse } from "../../great-course.page-type.ts"

export const languageAToZ = {
  id: "019db533-f39f-74ae-add2-f190ca8b03d3",
  pageTypeSlug: "great-course",
  slug: "language-a-to-z",
  title: "Language A to Z",
  status: "completed",
  rank: "B",
  unitSlug: "minutes",
  ownLength: 374.4,
  ownProgress: 374.4,
  partOfSlugs: [
    "all-great-courses",
    "hobby-and-personal-pursuits-great-courses",
    "literature-great-courses",
    "travel-and-culture-great-courses",
  ],
  source: "the-great-courses",
  externalId: "language-a-to-z",
  externalLink: "https://www.thegreatcoursesplus.com/language-a-to-z",
} as const satisfies GreatCourse
