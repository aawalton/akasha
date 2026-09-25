import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const macroeconomicsMadeClear = {
  id: "019db533-f39e-74aa-876d-2a2a8fadb5c9",
  type: "page-type/great-course",
  slug: "macroeconomics-made-clear",
  title: "Macroeconomics Made Clear",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 753.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "macroeconomics-made-clear",
      externalLink: "https://www.thegreatcoursesplus.com/macroeconomics-made-clear",
    },
  ],
} as const satisfies GreatCourse
