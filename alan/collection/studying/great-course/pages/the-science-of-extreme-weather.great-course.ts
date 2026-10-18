import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theScienceOfExtremeWeather = {
  id: "019db533-f39e-7e44-9369-01e9f5095280",
  type: "page-type/great-course",
  slug: "the-science-of-extreme-weather",
  title: "The Science of Extreme Weather",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 778.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-science-of-extreme-weather",
      externalLink: "https://plus.thegreatcourses.com/the-science-of-extreme-weather",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
