import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theNeuroscienceOfEverydayLife = {
  id: "019db533-f39e-7d8d-b8e0-f59810f85c54",
  type: "page-type/great-course",
  slug: "the-neuroscience-of-everyday-life",
  title: "The Neuroscience of Everyday Life",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1081.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-neuroscience-of-everyday-life",
      externalLink: "https://plus.thegreatcourses.com/the-neuroscience-of-everyday-life",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
