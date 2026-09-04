import type { GreatCourse } from "../../great-course.page-type.ts"

export const theApocryphalJesus = {
  id: "019db533-f39e-7c79-95f0-3b909c52b4c7",
  pageTypeSlug: "great-course",
  slug: "the-apocryphal-jesus",
  title: "The Apocryphal Jesus",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 753.6,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "philosophy-and-religion-great-courses"],
  source: "the-great-courses",
  externalId: "the-apocryphal-jesus",
  externalLink: "https://www.thegreatcoursesplus.com/the-apocryphal-jesus",
} as const satisfies GreatCourse
