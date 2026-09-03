import type { GreatCourse } from "../../great-course.page-type.ts"

export const theJoyOfScience = {
  id: "019db533-f39f-7234-b625-f4dca7670ea1",
  pageTypeSlug: "great-course",
  slug: "the-joy-of-science",
  title: "The Joy of Science",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1827.6,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "the-joy-of-science",
  externalLink: "https://www.thegreatcoursesplus.com/the-joy-of-science",
} as const satisfies GreatCourse
