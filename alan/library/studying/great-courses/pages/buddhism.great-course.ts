import type { GreatCourse } from "../great-course.page-type.types.ts"

export const buddhism = {
  id: "019db533-f39e-7d14-9215-c9c103499e84",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "buddhism",
  title: "Buddhism",
  status: "in-progress",
  unit: "minutes",
  ownLength: 746.4,
  ownProgress: 62.2,
  partOfCollections: ["all-great-courses", "philosophy-and-religion-great-courses"],
  source: "the-great-courses",
  externalId: "buddhism",
  externalLink: "https://www.thegreatcoursesplus.com/buddhism",
} as const satisfies GreatCourse
