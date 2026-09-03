import type { GreatCourse } from "../../great-course.page-type.ts"

export const theSymphony = {
  id: "019db533-f3a0-71df-9182-8af58b7b656d",
  pageTypeSlug: "great-course",
  slug: "the-symphony",
  title: "The Symphony",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1090.2,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "music-great-courses"],
  source: "the-great-courses",
  externalId: "the-symphony",
  externalLink: "https://www.thegreatcoursesplus.com/the-symphony",
} as const satisfies GreatCourse
