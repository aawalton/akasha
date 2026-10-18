import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const whatEinsteinGotWrong = {
  id: "019db533-f39e-7cf2-93eb-d8b68636f4cb",
  type: "page-type/great-course",
  slug: "what-einstein-got-wrong",
  title: "What Einstein Got Wrong",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 345.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "what-einstein-got-wrong",
      externalLink: "https://plus.thegreatcourses.com/what-einstein-got-wrong",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
