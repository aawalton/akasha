import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const advancedInvestments = {
  id: "019db533-f39e-7507-9d51-dbdc070cd64a",
  type: "page-type/great-course",
  slug: "advanced-investments",
  title: "Advanced Investments",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 766.2,
  ownProgress: 766.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "advanced-investments",
      externalLink: "https://www.thegreatcoursesplus.com/advanced-investments",
    },
  ],
} as const satisfies GreatCourse
