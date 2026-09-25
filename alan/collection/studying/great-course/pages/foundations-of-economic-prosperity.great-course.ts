import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const foundationsOfEconomicProsperity = {
  id: "019db533-f39e-74f1-b127-76f1a94a4024",
  type: "page-type/great-course",
  slug: "foundations-of-economic-prosperity",
  title: "Foundations of Economic Prosperity",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 736.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "foundations-of-economic-prosperity",
      externalLink: "https://www.thegreatcoursesplus.com/foundations-of-economic-prosperity",
    },
  ],
} as const satisfies GreatCourse
