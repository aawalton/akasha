import type { GreatCourse } from "../../great-course.page-type.ts"

export const historyOfAncientEgypt = {
  id: "019db533-f3a0-715d-950c-30946de5a067",
  pageTypeSlug: "great-course",
  slug: "history-of-ancient-egypt",
  title: "History of Ancient Egypt",
  status: "completed",
  rank: "B",
  unitSlug: "minutes",
  ownLength: 1450.8,
  ownProgress: 1450.8,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "history-of-ancient-egypt",
  externalLink: "https://www.thegreatcoursesplus.com/history-of-ancient-egypt",
} as const satisfies GreatCourse
