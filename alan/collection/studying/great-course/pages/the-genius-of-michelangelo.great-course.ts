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
      externalLink: "https://www.thegreatcoursesplus.com/the-genius-of-michelangelo",
    },
  ],
} as const satisfies GreatCourse
