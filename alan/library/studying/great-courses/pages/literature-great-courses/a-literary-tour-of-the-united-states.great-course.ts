import type { GreatCourse } from "../../great-course.page-type.ts"

export const aLiteraryTourOfTheUnitedStates = {
  id: "019db533-f39e-77d3-a6ae-c909aa8e5a7a",
  pageTypeSlug: "great-course",
  slug: "a-literary-tour-of-the-united-states",
  title: "A Literary Tour of the United States",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 672.6,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "literature-great-courses"],
  source: "the-great-courses",
  externalId: "a-literary-tour-of-the-united-states",
  externalLink: "https://www.thegreatcoursesplus.com/a-literary-tour-of-the-united-states",
} as const satisfies GreatCourse
