import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const practicalGeology = {
  id: "019db533-f39e-7f2d-b10b-c8339fceaa3e",
  type: "page-type/great-course",
  slug: "practical-geology",
  title: "Practical Geology",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 756.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "practical-geology",
      externalLink: "https://plus.thegreatcourses.com/practical-geology",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
