import type { GreatCourse } from "../../great-course.page-type.ts"

export const pilotLectureCatherineTheGreat = {
  id: "019db533-f3a0-70fe-8caf-76238464bb48",
  pageTypeSlug: "great-course",
  slug: "pilot-lecture-catherine-the-great",
  title: "Pilot Lecture: Catherine the Great",
  status: "completed",
  rank: "C",
  unitSlug: "minutes",
  ownLength: 23.4,
  ownProgress: 23.4,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "wondrium-pilots-catherine-the-great",
  externalLink: "https://www.thegreatcoursesplus.com/wondrium-pilots-catherine-the-great",
} as const satisfies GreatCourse
