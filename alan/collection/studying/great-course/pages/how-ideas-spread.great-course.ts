import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howIdeasSpread = {
  id: "019db533-f39e-74ca-94d0-60f3fe6af9d4",
  type: "page-type/great-course",
  slug: "how-ideas-spread",
  title: "How Ideas Spread",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 354.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-ideas-spread",
      externalLink: "https://www.thegreatcoursesplus.com/how-ideas-spread",
    },
  ],
} as const satisfies GreatCourse
