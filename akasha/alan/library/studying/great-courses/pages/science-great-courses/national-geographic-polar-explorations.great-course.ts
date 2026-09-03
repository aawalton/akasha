import type { GreatCourse } from "../../great-course.page-type.ts"

export const nationalGeographicPolarExplorations = {
  id: "019db533-f39f-74c3-94a7-e1920a323c37",
  pageTypeSlug: "great-course",
  slug: "national-geographic-polar-explorations",
  title: "National Geographic Polar Explorations",
  status: "completed",
  rank: "C",
  unitSlug: "minutes",
  ownLength: 669.6,
  ownProgress: 669.6,
  partOfSlugs: ["all-great-courses", "science-great-courses", "travel-and-culture-great-courses"],
  source: "the-great-courses",
  externalId: "national-geographic-polar-explorations",
  externalLink: "https://www.thegreatcoursesplus.com/national-geographic-polar-explorations",
} as const satisfies GreatCourse
