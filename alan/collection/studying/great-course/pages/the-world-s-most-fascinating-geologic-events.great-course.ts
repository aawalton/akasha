import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theWorldSMostFascinatingGeologicEvents = {
  id: "01a06578-6719-7005-af8e-dea1771f16a9",
  type: "page-type/great-course",
  slug: "the-world-s-most-fascinating-geologic-events",
  title: "The World's Most Fascinating Geologic Events",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-world-s-most-fascinating-geologic-events",
      externalLink: "https://plus.thegreatcourses.com/the-world-s-most-fascinating-geologic-events",
    },
  ],
} as const satisfies GreatCourse
