import type { GreatCourse } from "../../great-course.page-type.ts"

export const discreteMathematics = {
  id: "019db533-f3a0-7554-8537-433732f12e3b",
  pageTypeSlug: "great-course",
  slug: "discrete-mathematics",
  title: "Discrete Mathematics",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 764.4,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "mathematics-great-courses"],
  source: "the-great-courses",
  externalId: "discrete-mathematics",
  externalLink: "https://www.thegreatcoursesplus.com/discrete-mathematics",
} as const satisfies GreatCourse
