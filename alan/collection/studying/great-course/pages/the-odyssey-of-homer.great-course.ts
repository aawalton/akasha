import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theOdysseyOfHomer = {
  id: "019db533-f39e-77b4-a460-1851dc83b977",
  type: "page-type/great-course",
  slug: "the-odyssey-of-homer",
  title: "The Odyssey of Homer",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 366,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-odyssey-of-homer",
      externalLink: "https://www.thegreatcoursesplus.com/the-odyssey-of-homer",
    },
  ],
} as const satisfies GreatCourse
