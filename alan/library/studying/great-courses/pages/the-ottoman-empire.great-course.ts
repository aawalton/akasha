import type { GreatCourse } from "../great-course.page-type.ts"

export const theOttomanEmpire = {
  id: "019db533-f3a0-704d-ab44-f9eabb76b3fb",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "the-ottoman-empire",
  title: "The Ottoman Empire",
  status: "not-started",
  unit: "minutes",
  ownLength: 1135.2,
  ownProgress: 0,
  partOfCollections: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "the-ottoman-empire",
  externalLink: "https://www.thegreatcoursesplus.com/the-ottoman-empire",
} as const satisfies GreatCourse
