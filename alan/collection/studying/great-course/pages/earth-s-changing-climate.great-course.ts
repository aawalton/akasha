import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const earthSChangingClimate = {
  id: "019db533-f39e-7cf9-854e-955dbd07107a",
  type: "page-type/great-course",
  slug: "earth-s-changing-climate",
  title: "Earth's Changing Climate",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 368.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "earth-s-changing-climate",
      externalLink: "https://plus.thegreatcourses.com/earth-s-changing-climate",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
