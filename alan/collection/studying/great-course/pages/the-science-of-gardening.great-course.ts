import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theScienceOfGardening = {
  id: "019db533-f39e-76bc-99d8-de0770d0fd8c",
  type: "page-type/great-course",
  slug: "the-science-of-gardening",
  title: "The Science of Gardening",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 721.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-science-of-gardening",
      externalLink: "https://plus.thegreatcourses.com/the-science-of-gardening",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
