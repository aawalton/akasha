import type { GreatCourse } from "../../great-course.page-type.ts"

export const womenOfHistory = {
  id: "019db533-f39f-7ac8-b3ef-0a33ec6e95ef",
  pageTypeSlug: "great-course",
  slug: "women-of-history",
  title: "Women of History",
  status: "completed",
  rank: "C",
  unitSlug: "minutes",
  ownLength: 39,
  ownProgress: 39,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "women-of-history",
  externalLink: "https://www.thegreatcoursesplus.com/women-of-history",
} as const satisfies GreatCourse
