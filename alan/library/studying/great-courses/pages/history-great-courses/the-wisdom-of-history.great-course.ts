import type { GreatCourse } from "../../great-course.page-type.ts"

export const theWisdomOfHistory = {
  id: "019db533-f3a0-71da-b6da-df9653fa8576",
  pageTypeSlug: "great-course",
  slug: "the-wisdom-of-history",
  title: "The Wisdom of History",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1092.6,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "the-wisdom-of-history",
  externalLink: "https://www.thegreatcoursesplus.com/the-wisdom-of-history",
} as const satisfies GreatCourse
