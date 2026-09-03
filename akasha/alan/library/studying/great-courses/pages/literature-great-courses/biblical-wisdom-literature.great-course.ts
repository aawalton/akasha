import type { GreatCourse } from "../../great-course.page-type.ts"

export const biblicalWisdomLiterature = {
  id: "019db533-f39e-7aca-b9d8-2eb4fb60f78e",
  pageTypeSlug: "great-course",
  slug: "biblical-wisdom-literature",
  title: "Biblical Wisdom Literature",
  status: "completed",
  rank: "C",
  unitSlug: "minutes",
  ownLength: 1113,
  ownProgress: 1113,
  partOfSlugs: [
    "all-great-courses",
    "literature-great-courses",
    "philosophy-and-religion-great-courses",
  ],
  source: "the-great-courses",
  externalId: "biblical-wisdom-literature",
  externalLink: "https://www.thegreatcoursesplus.com/biblical-wisdom-literature",
} as const satisfies GreatCourse
