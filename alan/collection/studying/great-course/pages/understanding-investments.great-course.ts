import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingInvestments = {
  id: "019db533-f3a0-71d6-b6cf-2c0946bf4c0b",
  type: "page-type/great-course",
  slug: "understanding-investments",
  title: "Understanding Investments",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 706.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/mathematics-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-investments",
      externalLink: "https://www.thegreatcoursesplus.com/understanding-investments",
    },
  ],
} as const satisfies GreatCourse
