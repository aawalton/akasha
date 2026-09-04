import type { GreatCourse } from "../../great-course.page-type.ts"

export const famousRomans = {
  id: "019db533-f3a0-755f-945c-b7a242915533",
  pageTypeSlug: "great-course",
  slug: "famous-romans",
  title: "Famous Romans",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 744,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "famous-romans",
  externalLink: "https://www.thegreatcoursesplus.com/famous-romans",
} as const satisfies GreatCourse
