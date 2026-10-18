import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const lifeInTheWorldSOceans = {
  id: "019db533-f39e-7f03-9a10-1bea881526c7",
  type: "page-type/great-course",
  slug: "life-in-the-world-s-oceans",
  title: "Life in the World's Oceans",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 970.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "life-in-the-worlds-oceans",
      externalLink: "https://plus.thegreatcourses.com/life-in-the-worlds-oceans",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
