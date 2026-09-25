import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theHighMiddleAges = {
  id: "019db533-f3a0-71cc-afa3-f10758900793",
  type: "page-type/great-course",
  slug: "the-high-middle-ages",
  title: "The High Middle Ages",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 743.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-high-middle-ages",
      externalLink: "https://www.thegreatcoursesplus.com/the-high-middle-ages",
    },
  ],
} as const satisfies GreatCourse
