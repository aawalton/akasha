import type { GreatCourse } from "../../great-course.page-type.ts"

export const theShapeOfNature = {
  id: "019db533-f39e-7b80-9058-57783f520c5e",
  pageTypeSlug: "great-course",
  slug: "the-shape-of-nature",
  title: "The Shape of Nature",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1119.6,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "the-shape-of-nature",
  externalLink: "https://www.thegreatcoursesplus.com/the-shape-of-nature",
} as const satisfies GreatCourse
