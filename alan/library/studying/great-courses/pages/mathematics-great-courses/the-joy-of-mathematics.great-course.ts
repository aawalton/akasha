import type { GreatCourse } from "../../great-course.page-type.ts"

export const theJoyOfMathematics = {
  id: "019db533-f3a0-771d-8913-b1216dec828d",
  pageTypeSlug: "great-course",
  slug: "the-joy-of-mathematics",
  title: "The Joy of Mathematics",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 739.2,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "mathematics-great-courses"],
  source: "the-great-courses",
  externalId: "the-joy-of-mathematics",
  externalLink: "https://www.thegreatcoursesplus.com/the-joy-of-mathematics",
} as const satisfies GreatCourse
