import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const fieldGuideToNorthAmericanWildlife = {
  id: "019db533-f39e-7ea3-9ff8-662c736ebb8c",
  type: "page-type/great-course",
  slug: "field-guide-to-north-american-wildlife",
  title: "Field Guide to North American Wildlife",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 335.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "field-guide-to-north-american-wildlife",
      externalLink: "https://www.thegreatcoursesplus.com/field-guide-to-north-american-wildlife",
    },
  ],
} as const satisfies GreatCourse
