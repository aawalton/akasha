import type { GreatCourse } from "../../great-course.page-type.ts"

export const buddhism = {
  id: "019db533-f39e-7d14-9215-c9c103499e84",
  pageTypeSlug: "great-course",
  slug: "buddhism",
  title: "Buddhism",
  status: "in-progress",
  unitSlug: "minutes",
  ownLength: 746.4,
  ownProgress: 62.2,
  partOfSlugs: ["all-great-courses", "philosophy-and-religion-great-courses"],
  source: "the-great-courses",
  externalId: "buddhism",
  externalLink: "https://www.thegreatcoursesplus.com/buddhism",
} as const satisfies GreatCourse
