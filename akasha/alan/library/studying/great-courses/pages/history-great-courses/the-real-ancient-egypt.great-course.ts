import type { GreatCourse } from "../../great-course.page-type.ts"

export const theRealAncientEgypt = {
  id: "019db533-f3a0-7061-9ec1-47c88339e799",
  pageTypeSlug: "great-course",
  slug: "the-real-ancient-egypt",
  title: "The Real Ancient Egypt",
  status: "completed",
  rank: "C",
  unitSlug: "minutes",
  ownLength: 235.2,
  ownProgress: 235.2,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "the-real-ancient-egypt",
  externalLink: "https://www.thegreatcoursesplus.com/the-real-ancient-egypt",
} as const satisfies GreatCourse
