import type { GreatCourse } from "../../great-course.page-type.ts"

export const theWorldOfBiblicalIsrael = {
  id: "019db533-f39f-7ff9-893f-b9f68082338f",
  pageTypeSlug: "great-course",
  slug: "the-world-of-biblical-israel",
  title: "The World of Biblical Israel",
  status: "completed",
  rank: "C",
  unitSlug: "minutes",
  ownLength: 738.6,
  ownProgress: 738.6,
  partOfSlugs: [
    "all-great-courses",
    "history-great-courses",
    "philosophy-and-religion-great-courses",
  ],
  source: "the-great-courses",
  externalId: "the-world-of-biblical-israel",
  externalLink: "https://www.thegreatcoursesplus.com/the-world-of-biblical-israel",
} as const satisfies GreatCourse
