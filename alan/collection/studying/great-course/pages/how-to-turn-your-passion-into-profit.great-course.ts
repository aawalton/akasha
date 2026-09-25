import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howToTurnYourPassionIntoProfit = {
  id: "019db533-f39e-76d2-8383-4a7640048c10",
  type: "page-type/great-course",
  slug: "how-to-turn-your-passion-into-profit",
  title: "How to Turn Your Passion into Profit",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 583.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-to-turn-your-passion-into-profit",
      externalLink: "https://www.thegreatcoursesplus.com/how-to-turn-your-passion-into-profit",
    },
  ],
} as const satisfies GreatCourse
