import type { GreatCourse } from "../../great-course.page-type.ts"

export const knitting101 = {
  id: "019db533-f39e-7736-8d09-108d55783bc0",
  pageTypeSlug: "great-course",
  slug: "knitting-101",
  title: "Knitting 101",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 635.4,
  ownProgress: 635.4,
  partOfSlugs: ["all-great-courses", "hobby-and-personal-pursuits-great-courses"],
  source: "the-great-courses",
  externalId: "knitting-101",
  externalLink: "https://www.thegreatcoursesplus.com/knitting-101",
} as const satisfies GreatCourse
