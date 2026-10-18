import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const algebraIi = {
  id: "019db533-f3a0-7959-968d-ffca4a13cff2",
  type: "page-type/great-course",
  slug: "algebra-ii",
  title: "Algebra II",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 1120.8,
  ownProgress: 1120.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/mathematics-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "algebra-ii",
      externalLink: "https://plus.thegreatcourses.com/algebra-ii",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
