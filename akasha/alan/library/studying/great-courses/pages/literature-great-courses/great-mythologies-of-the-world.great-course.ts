import type { GreatCourse } from "../../great-course.page-type.ts"

export const greatMythologiesOfTheWorld = {
  id: "019db533-f39e-78ed-8606-57806860cf4e",
  pageTypeSlug: "great-course",
  slug: "great-mythologies-of-the-world",
  title: "Great Mythologies of the World",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1905.6,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "literature-great-courses"],
  source: "the-great-courses",
  externalId: "great-mythologies-of-the-world",
  externalLink: "https://www.thegreatcoursesplus.com/great-mythologies-of-the-world",
} as const satisfies GreatCourse
