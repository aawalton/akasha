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
      externalLink: "https://www.thegreatcoursesplus.com/understanding-economics-game-theory",
    },
  ],
} as const satisfies GreatCourse
