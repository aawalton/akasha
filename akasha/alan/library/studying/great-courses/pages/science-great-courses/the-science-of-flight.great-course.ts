import type { GreatCourse } from "../../great-course.page-type.ts"

export const theScienceOfFlight = {
  id: "019db533-f39e-7b68-950f-e1ae936f3d50",
  pageTypeSlug: "great-course",
  slug: "the-science-of-flight",
  title: "The Science of Flight",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 864.6,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "the-science-of-flight",
  externalLink: "https://www.thegreatcoursesplus.com/the-science-of-flight",
} as const satisfies GreatCourse
