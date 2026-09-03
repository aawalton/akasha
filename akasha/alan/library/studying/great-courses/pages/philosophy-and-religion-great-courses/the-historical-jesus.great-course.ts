import type { GreatCourse } from "../../great-course.page-type.ts"

export const theHistoricalJesus = {
  id: "019db533-f39e-78fb-bcec-983677d766d2",
  pageTypeSlug: "great-course",
  slug: "the-historical-jesus",
  title: "The Historical Jesus",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 733.2,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "philosophy-and-religion-great-courses"],
  source: "the-great-courses",
  externalId: "the-historical-jesus",
  externalLink: "https://www.thegreatcoursesplus.com/the-historical-jesus",
} as const satisfies GreatCourse
