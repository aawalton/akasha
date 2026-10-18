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
      externalLink: "https://plus.thegreatcourses.com/field-guide-to-north-american-wildlife",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
