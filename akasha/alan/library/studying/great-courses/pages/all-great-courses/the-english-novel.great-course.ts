import type { GreatCourse } from "../../great-course.page-type.ts"

export const theEnglishNovel = {
  id: "019db533-f387-7fbd-b1e7-2abb5ea63b34",
  pageTypeSlug: "great-course",
  slug: "the-english-novel",
  title: "The English Novel",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 745.95,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses"],
  source: "the-great-courses",
  externalId: "the-english-novel",
  externalLink: "https://www.thegreatcoursesplus.com/the-english-novel",
} as const satisfies GreatCourse
