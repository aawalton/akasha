import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const tibetHistoryCultureAndReligion = {
  id: "019db533-f39f-7bbe-b591-e8974981845e",
  type: "page-type/great-course",
  slug: "tibet-history-culture-and-religion",
  title: "Tibet: History, Culture, and Religion",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 528.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "tibet-history-culture-and-religion",
      externalLink: "https://www.thegreatcoursesplus.com/tibet-history-culture-and-religion",
    },
  ],
} as const satisfies GreatCourse
