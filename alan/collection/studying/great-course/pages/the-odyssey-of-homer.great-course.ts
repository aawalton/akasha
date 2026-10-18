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
      externalLink: "https://plus.thegreatcourses.com/the-odyssey-of-homer",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
