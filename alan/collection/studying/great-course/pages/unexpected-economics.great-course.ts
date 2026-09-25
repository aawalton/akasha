import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const unexpectedEconomics = {
  id: "019db533-f39e-732a-9c01-59a1dfffb29b",
  type: "page-type/great-course",
  slug: "unexpected-economics",
  title: "Unexpected Economics",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 727.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "unexpected-economics",
      externalLink: "https://www.thegreatcoursesplus.com/unexpected-economics",
    },
  ],
} as const satisfies GreatCourse
