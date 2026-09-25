import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const whyEconomiesRiseOrFall = {
  id: "019db533-f39e-7311-a024-18d705298dc0",
  type: "page-type/great-course",
  slug: "why-economies-rise-or-fall",
  title: "Why Economies Rise or Fall",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 727.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "why-economies-rise-or-fall",
      externalLink: "https://www.thegreatcoursesplus.com/why-economies-rise-or-fall",
    },
  ],
} as const satisfies GreatCourse
