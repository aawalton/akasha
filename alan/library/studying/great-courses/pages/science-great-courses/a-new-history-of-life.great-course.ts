import type { GreatCourse } from "../../great-course.page-type.ts"

export const aNewHistoryOfLife = {
  id: "019db533-f39f-7425-ab63-63a4812c350b",
  pageTypeSlug: "great-course",
  slug: "a-new-history-of-life",
  title: "A New History of Life",
  status: "completed",
  rank: "C",
  unitSlug: "minutes",
  ownLength: 1069.2,
  ownProgress: 1069.2,
  partOfSlugs: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "a-new-history-of-life",
  externalLink: "https://www.thegreatcoursesplus.com/a-new-history-of-life",
} as const satisfies GreatCourse
