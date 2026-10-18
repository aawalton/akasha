import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const jesusAndTheGospels = {
  id: "019db533-f39e-7cea-9cc0-77e28f07f27a",
  type: "page-type/great-course",
  slug: "jesus-and-the-gospels",
  title: "Jesus and the Gospels",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1100.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "jesus-and-the-gospels",
      externalLink: "https://plus.thegreatcourses.com/jesus-and-the-gospels",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
