import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theFutureOfSpaceExploration = {
  id: "019db533-f39e-7dd7-8c64-a45ddb58d774",
  type: "page-type/great-course",
  slug: "the-future-of-space-exploration",
  title: "The Future of Space Exploration",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 337.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-future-of-space-exploration",
      externalLink: "https://www.thegreatcoursesplus.com/the-future-of-space-exploration",
    },
  ],
} as const satisfies GreatCourse
