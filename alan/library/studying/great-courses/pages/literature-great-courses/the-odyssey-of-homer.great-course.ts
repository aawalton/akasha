import type { GreatCourse } from "../../great-course.page-type.ts"

export const theOdysseyOfHomer = {
  id: "019db533-f39e-77b4-a460-1851dc83b977",
  pageTypeSlug: "great-course",
  slug: "the-odyssey-of-homer",
  title: "The Odyssey of Homer",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 366,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "literature-great-courses"],
  source: "the-great-courses",
  externalId: "the-odyssey-of-homer",
  externalLink: "https://www.thegreatcoursesplus.com/the-odyssey-of-homer",
} as const satisfies GreatCourse
