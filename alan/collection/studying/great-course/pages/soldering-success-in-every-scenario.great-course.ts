import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const solderingSuccessInEveryScenario = {
  id: "019db533-f39e-75fa-a477-7d0bc6f9e2f4",
  type: "page-type/great-course",
  slug: "soldering-success-in-every-scenario",
  title: "Soldering Success in Every Scenario",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 111.6,
  ownProgress: 111.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "soldering-success-in-every-scenario",
      externalLink: "https://www.thegreatcoursesplus.com/soldering-success-in-every-scenario",
    },
  ],
} as const satisfies GreatCourse
