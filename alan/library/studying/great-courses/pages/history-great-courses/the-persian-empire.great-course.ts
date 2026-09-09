import type { GreatCourse } from "../../great-course.page-type.ts"

export const thePersianEmpire = {
  id: "019db533-f39f-7ba8-a898-8096588b0225",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "the-persian-empire",
  title: "The Persian Empire",
  status: "not-started",
  unit: "minutes",
  ownLength: 718.8,
  ownProgress: 0,
  partOfCollections: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "the-persian-empire",
  externalLink: "https://www.thegreatcoursesplus.com/the-persian-empire",
} as const satisfies GreatCourse
