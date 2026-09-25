import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theoryOfEvolutionAHistoryOfControversy = {
  id: "019db533-f39e-7bb8-a877-1e8c8eba7cca",
  type: "page-type/great-course",
  slug: "theory-of-evolution-a-history-of-controversy",
  title: "Theory of Evolution: A History of Controversy",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 367.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "theory-of-evolution-a-history-of-controversy",
      externalLink:
        "https://www.thegreatcoursesplus.com/theory-of-evolution-a-history-of-controversy",
    },
  ],
} as const satisfies GreatCourse
