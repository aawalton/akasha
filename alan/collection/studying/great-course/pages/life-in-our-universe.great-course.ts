import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const lifeInOurUniverse = {
  id: "019db533-f39f-72d3-96d3-183e13aa4b0a",
  type: "page-type/great-course",
  slug: "life-in-our-universe",
  title: "Life in Our Universe",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 728.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "life-in-our-universe",
      externalLink: "https://plus.thegreatcourses.com/life-in-our-universe",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
