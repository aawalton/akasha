import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const turningPointsInMiddleEasternHistory = {
  id: "019db533-f39f-7b53-944d-53788f02e0ce",
  type: "page-type/great-course",
  slug: "turning-points-in-middle-eastern-history",
  title: "Turning Points in Middle Eastern History",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1099.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "turning-points-in-middle-eastern-history",
      externalLink: "https://www.thegreatcoursesplus.com/turning-points-in-middle-eastern-history",
    },
  ],
} as const satisfies GreatCourse
