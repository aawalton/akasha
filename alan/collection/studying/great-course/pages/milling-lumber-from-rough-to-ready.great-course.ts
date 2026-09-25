import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const millingLumberFromRoughToReady = {
  id: "019db533-f39e-7428-b47e-af82c7b9f686",
  type: "page-type/great-course",
  slug: "milling-lumber-from-rough-to-ready",
  title: "Milling Lumber: From Rough to Ready",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 91.8,
  ownProgress: 91.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "milling-lumber-from-rough-to-ready",
      externalLink: "https://www.thegreatcoursesplus.com/milling-lumber-from-rough-to-ready",
    },
  ],
} as const satisfies GreatCourse
