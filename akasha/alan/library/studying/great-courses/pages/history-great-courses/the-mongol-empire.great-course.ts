import type { GreatCourse } from "../../great-course.page-type.ts"

export const theMongolEmpire = {
  id: "019db533-f39f-7c29-9aa7-899cb31b4857",
  pageTypeSlug: "great-course",
  slug: "the-mongol-empire",
  title: "The Mongol Empire",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 693.6,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "history-great-courses", "learning-paths-great-courses"],
  source: "the-great-courses",
  externalId: "the-mongol-empire",
  externalLink: "https://www.thegreatcoursesplus.com/the-mongol-empire",
} as const satisfies GreatCourse
