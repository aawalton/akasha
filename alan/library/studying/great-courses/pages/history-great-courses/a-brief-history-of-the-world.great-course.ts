import type { GreatCourse } from "../../great-course.page-type.ts"

export const aBriefHistoryOfTheWorld = {
  id: "019db533-f3a0-7226-9c31-eb82b708497b",
  pageTypeSlug: "great-course",
  slug: "a-brief-history-of-the-world",
  title: "A Brief History of the World",
  status: "completed",
  rank: "C",
  unitSlug: "minutes",
  ownLength: 1140.6,
  ownProgress: 1140.6,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "a-brief-history-of-the-world",
  externalLink: "https://www.thegreatcoursesplus.com/a-brief-history-of-the-world",
} as const satisfies GreatCourse
