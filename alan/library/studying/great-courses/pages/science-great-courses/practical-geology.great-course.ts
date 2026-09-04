import type { GreatCourse } from "../../great-course.page-type.ts"

export const practicalGeology = {
  id: "019db533-f39e-7f2d-b10b-c8339fceaa3e",
  pageTypeSlug: "great-course",
  slug: "practical-geology",
  title: "Practical Geology",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 756.6,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "practical-geology",
  externalLink: "https://www.thegreatcoursesplus.com/practical-geology",
} as const satisfies GreatCourse
