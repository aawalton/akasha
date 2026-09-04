import type { GreatCourse } from "../../great-course.page-type.ts"

export const theVietnamWar = {
  id: "019db533-f3a0-702f-9d46-29165fa44723",
  pageTypeSlug: "great-course",
  slug: "the-vietnam-war",
  title: "The Vietnam War",
  status: "completed",
  rank: "B",
  unitSlug: "minutes",
  ownLength: 685.2,
  ownProgress: 685.2,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "the-vietnam-war",
  externalLink: "https://www.thegreatcoursesplus.com/the-vietnam-war",
} as const satisfies GreatCourse
