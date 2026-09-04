import type { GreatCourse } from "../../great-course.page-type.ts"

export const lifeInOurUniverse = {
  id: "019db533-f39f-72d3-96d3-183e13aa4b0a",
  pageTypeSlug: "great-course",
  slug: "life-in-our-universe",
  title: "Life in Our Universe",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 728.4,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "life-in-our-universe",
  externalLink: "https://www.thegreatcoursesplus.com/life-in-our-universe",
} as const satisfies GreatCourse
