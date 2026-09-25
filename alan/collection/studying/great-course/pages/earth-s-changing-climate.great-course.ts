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
      externalLink: "https://www.thegreatcoursesplus.com/earth-s-changing-climate",
    },
  ],
} as const satisfies GreatCourse
