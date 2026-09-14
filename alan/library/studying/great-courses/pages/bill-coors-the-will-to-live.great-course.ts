import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const billCoorsTheWillToLive = {
  id: "019db533-f3a0-7a4e-8a64-be099e3476f1",
  type: "great-course",
  slug: "bill-coors-the-will-to-live",
  title: "Bill Coors: The Will to Live",
  status: "completed",
  rank: "C",
  unit: "unit/minutes",
  ownLength: 126.6,
  ownProgress: 126.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "bill-coors-the-will-to-live",
      externalLink: "https://www.thegreatcoursesplus.com/bill-coors-the-will-to-live",
    },
  ],
} as const satisfies GreatCourse
