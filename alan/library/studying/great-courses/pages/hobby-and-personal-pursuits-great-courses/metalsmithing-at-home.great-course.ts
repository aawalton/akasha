import type { GreatCourse } from "../../great-course.page-type.ts"

export const metalsmithingAtHome = {
  id: "019db533-f39e-74b2-9794-d7f9aea0d44a",
  pageTypeSlug: "great-course",
  slug: "metalsmithing-at-home",
  title: "Metalsmithing at Home",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 404.4,
  ownProgress: 404.4,
  partOfSlugs: ["all-great-courses", "hobby-and-personal-pursuits-great-courses"],
  source: "the-great-courses",
  externalId: "metalsmithing-at-home",
  externalLink: "https://www.thegreatcoursesplus.com/metalsmithing-at-home",
} as const satisfies GreatCourse
