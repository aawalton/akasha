import type { GreatCourse } from "../../great-course.page-type.ts"

export const theHistoryOfAncientRome = {
  id: "019db533-f39f-7cfb-b94a-f4ebdea69829",
  pageTypeSlug: "great-course",
  slug: "the-history-of-ancient-rome",
  title: "The History of Ancient Rome",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1451.4,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "the-history-of-ancient-rome",
  externalLink: "https://www.thegreatcoursesplus.com/the-history-of-ancient-rome",
} as const satisfies GreatCourse
