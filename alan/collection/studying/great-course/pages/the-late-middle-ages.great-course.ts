import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theLateMiddleAges = {
  id: "019db533-f3a0-7248-bfd8-033bc0473af8",
  type: "page-type/great-course",
  slug: "the-late-middle-ages",
  title: "The Late Middle Ages",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 737.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-late-middle-ages",
      externalLink: "https://www.thegreatcoursesplus.com/the-late-middle-ages",
    },
  ],
} as const satisfies GreatCourse
