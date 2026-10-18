import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingEconomicsGameTheory = {
  id: "019db533-f39e-733a-8671-5f8cc6d052b5",
  type: "page-type/great-course",
  slug: "understanding-economics-game-theory",
  title: "Understanding Economics: Game Theory",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 360,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-economics-game-theory",
      externalLink: "https://plus.thegreatcourses.com/understanding-economics-game-theory",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
