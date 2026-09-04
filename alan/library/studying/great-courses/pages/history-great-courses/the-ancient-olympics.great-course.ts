import type { GreatCourse } from "../../great-course.page-type.ts"

export const theAncientOlympics = {
  id: "019db533-f3a0-70f0-9f9f-c293dc29dab8",
  pageTypeSlug: "great-course",
  slug: "the-ancient-olympics",
  title: "The Ancient Olympics",
  status: "completed",
  rank: "B",
  unitSlug: "minutes",
  ownLength: 27,
  ownProgress: 27,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "the-ancient-olympics",
  externalLink: "https://www.thegreatcoursesplus.com/the-ancient-olympics",
} as const satisfies GreatCourse
