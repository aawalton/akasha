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
      externalLink: "https://www.thegreatcoursesplus.com/the-science-of-extreme-weather",
    },
  ],
} as const satisfies GreatCourse
