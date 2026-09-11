import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const biblicalWisdomLiterature = {
  id: "019db533-f39e-7aca-b9d8-2eb4fb60f78e",
  type: "great-course",
  slug: "biblical-wisdom-literature",
  title: "Biblical Wisdom Literature",
  status: "completed",
  rank: "C",
  unit: "minutes",
  ownLength: 1113,
  ownProgress: 1113,
  partOfCollections: [
    "all-great-courses",
    "literature-great-courses",
    "philosophy-and-religion-great-courses",
  ],
  source: "the-great-courses",
  externalId: "biblical-wisdom-literature",
  externalLink: "https://www.thegreatcoursesplus.com/biblical-wisdom-literature",
} as const satisfies GreatCourse
