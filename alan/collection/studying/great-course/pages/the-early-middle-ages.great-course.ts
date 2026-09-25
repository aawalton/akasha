import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theEarlyMiddleAges = {
  id: "019db533-f39f-7e2e-b5cd-27f7d0bf5bfb",
  type: "page-type/great-course",
  slug: "the-early-middle-ages",
  title: "The Early Middle Ages",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 747,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-early-middle-ages",
      externalLink: "https://www.thegreatcoursesplus.com/the-early-middle-ages",
    },
  ],
} as const satisfies GreatCourse
