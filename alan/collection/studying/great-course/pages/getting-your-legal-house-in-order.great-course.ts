import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const gettingYourLegalHouseInOrder = {
  id: "019db533-f39e-76da-b1d0-37c0c7f6b5bc",
  type: "page-type/great-course",
  slug: "getting-your-legal-house-in-order",
  title: "Getting Your Legal House in Order",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 567.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "getting-your-legal-house-in-order",
      externalLink: "https://www.thegreatcoursesplus.com/getting-your-legal-house-in-order",
    },
  ],
} as const satisfies GreatCourse
