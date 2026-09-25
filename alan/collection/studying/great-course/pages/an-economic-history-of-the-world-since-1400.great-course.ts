import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const anEconomicHistoryOfTheWorldSince1400 = {
  id: "019db533-f39f-7f77-9f71-12d44a192519",
  type: "page-type/great-course",
  slug: "an-economic-history-of-the-world-since-1400",
  title: "An Economic History of the World since 1400",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 1472.4,
  ownProgress: 1472.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "an-economic-history-of-the-world-since-1400",
      externalLink:
        "https://www.thegreatcoursesplus.com/an-economic-history-of-the-world-since-1400",
    },
  ],
} as const satisfies GreatCourse
