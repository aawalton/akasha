import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theHistoryOfSpainLandOnACrossroad = {
  id: "019db533-f39f-7c13-8a1b-fa3e6f6bfd67",
  type: "page-type/great-course",
  slug: "the-history-of-spain-land-on-a-crossroad",
  title: "The History of Spain: Land on a Crossroad",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 724.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-history-of-spain-land-on-a-crossroad",
      externalLink: "https://www.thegreatcoursesplus.com/the-history-of-spain-land-on-a-crossroad",
    },
  ],
} as const satisfies GreatCourse
