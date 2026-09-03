import type { GreatCourse } from "../../great-course.page-type.ts"

export const historyOfTheSupremeCourt = {
  id: "019db533-f39f-7f56-a85a-048fdd8b49f0",
  pageTypeSlug: "great-course",
  slug: "history-of-the-supreme-court",
  title: "History of the Supreme Court",
  status: "completed",
  rank: "B",
  unitSlug: "minutes",
  ownLength: 1089,
  ownProgress: 1089,
  partOfSlugs: [
    "all-great-courses",
    "history-great-courses",
    "philosophy-and-religion-great-courses",
  ],
  source: "the-great-courses",
  externalId: "history-of-the-supreme-court",
  externalLink: "https://www.thegreatcoursesplus.com/history-of-the-supreme-court",
} as const satisfies GreatCourse
