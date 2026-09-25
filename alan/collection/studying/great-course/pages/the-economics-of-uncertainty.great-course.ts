import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theEconomicsOfUncertainty = {
  id: "019db533-f39e-7411-829b-ad03b3b93299",
  type: "page-type/great-course",
  slug: "the-economics-of-uncertainty",
  title: "The Economics of Uncertainty",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 747.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-economics-of-uncertainty",
      externalLink: "https://www.thegreatcoursesplus.com/the-economics-of-uncertainty",
    },
  ],
} as const satisfies GreatCourse
