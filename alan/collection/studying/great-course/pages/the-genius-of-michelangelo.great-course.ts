import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGeniusOfMichelangelo = {
  id: "019db533-f39f-73c6-8cd1-024f6a45a5ac",
  type: "page-type/great-course",
  slug: "the-genius-of-michelangelo",
  title: "The Genius of Michelangelo",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 1075.8,
  ownProgress: 1075.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-genius-of-michelangelo",
      externalLink: "https://plus.thegreatcourses.com/the-genius-of-michelangelo",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
