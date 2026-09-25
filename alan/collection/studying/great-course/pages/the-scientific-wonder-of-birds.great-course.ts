import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theScientificWonderOfBirds = {
  id: "019db533-f39e-7b37-8ced-1e2ae9fe99a2",
  type: "page-type/great-course",
  slug: "the-scientific-wonder-of-birds",
  title: "The Scientific Wonder of Birds",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 327.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-scientific-wonder-of-birds",
      externalLink: "https://www.thegreatcoursesplus.com/the-scientific-wonder-of-birds",
    },
  ],
} as const satisfies GreatCourse
