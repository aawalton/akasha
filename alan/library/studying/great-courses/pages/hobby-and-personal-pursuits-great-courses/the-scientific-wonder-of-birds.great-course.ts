import type { GreatCourse } from "../../great-course.page-type.ts"

export const theScientificWonderOfBirds = {
  id: "019db533-f39e-7b37-8ced-1e2ae9fe99a2",
  pageTypeSlug: "great-course",
  slug: "the-scientific-wonder-of-birds",
  title: "The Scientific Wonder of Birds",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 327.6,
  ownProgress: 0,
  partOfSlugs: [
    "all-great-courses",
    "hobby-and-personal-pursuits-great-courses",
    "science-great-courses",
  ],
  source: "the-great-courses",
  externalId: "the-scientific-wonder-of-birds",
  externalLink: "https://www.thegreatcoursesplus.com/the-scientific-wonder-of-birds",
} as const satisfies GreatCourse
