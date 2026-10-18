import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const mathAndMagic = {
  id: "019db533-f3a0-77fc-8ec6-32c4d954d64b",
  type: "page-type/great-course",
  slug: "math-and-magic",
  title: "Math and Magic",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 388.2,
  ownProgress: 388.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/mathematics-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "math-and-magic",
      externalLink: "https://plus.thegreatcourses.com/math-and-magic",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
