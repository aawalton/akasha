import type { GreatCourse } from "../../great-course.page-type.ts"

export const aFieldGuideToThePlanets = {
  id: "019db533-f39f-73d0-a200-bfee62ffc8e4",
  pageTypeSlug: "great-course",
  slug: "a-field-guide-to-the-planets",
  title: "A Field Guide to the Planets",
  status: "completed",
  rank: "C",
  unitSlug: "minutes",
  ownLength: 760.2,
  ownProgress: 760.2,
  partOfSlugs: ["all-great-courses", "learning-paths-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "a-field-guide-to-the-planets",
  externalLink: "https://www.thegreatcoursesplus.com/a-field-guide-to-the-planets",
} as const satisfies GreatCourse
