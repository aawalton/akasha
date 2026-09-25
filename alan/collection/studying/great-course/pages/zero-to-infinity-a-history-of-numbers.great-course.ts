import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const zeroToInfinityAHistoryOfNumbers = {
  id: "019db533-f3a0-74f4-8746-d3bd24d2f90d",
  type: "page-type/great-course",
  slug: "zero-to-infinity-a-history-of-numbers",
  title: "Zero to Infinity: A History of Numbers",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 725.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/mathematics-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "zero-to-infinity-a-history-of-numbers",
      externalLink: "https://www.thegreatcoursesplus.com/zero-to-infinity-a-history-of-numbers",
    },
  ],
} as const satisfies GreatCourse
