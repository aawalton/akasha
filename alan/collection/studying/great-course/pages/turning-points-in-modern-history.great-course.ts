import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const turningPointsInModernHistory = {
  id: "019db533-f3a0-720a-acf3-ff9b0f99aadb",
  type: "page-type/great-course",
  slug: "turning-points-in-modern-history",
  title: "Turning Points in Modern History",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 739.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "turning-points-in-modern-history",
      externalLink: "https://www.thegreatcoursesplus.com/turning-points-in-modern-history",
    },
  ],
} as const satisfies GreatCourse
