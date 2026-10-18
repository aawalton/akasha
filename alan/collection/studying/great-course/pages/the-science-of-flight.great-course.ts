import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theScienceOfFlight = {
  id: "019db533-f39e-7b68-950f-e1ae936f3d50",
  type: "page-type/great-course",
  slug: "the-science-of-flight",
  title: "The Science of Flight",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 864.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-science-of-flight",
      externalLink: "https://plus.thegreatcourses.com/the-science-of-flight",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
