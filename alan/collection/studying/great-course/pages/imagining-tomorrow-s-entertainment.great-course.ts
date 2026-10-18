import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const imaginingTomorrowSEntertainment = {
  id: "019db533-f39e-7593-a7a3-b2d5ce615b35",
  type: "page-type/great-course",
  slug: "imagining-tomorrow-s-entertainment",
  title: "Imagining Tomorrow’s Entertainment",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 249,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "imagining-tomorrow-s-entertainment",
      externalLink: "https://plus.thegreatcourses.com/imagining-tomorrow-s-entertainment",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
