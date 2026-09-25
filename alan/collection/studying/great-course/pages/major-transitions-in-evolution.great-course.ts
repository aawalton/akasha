import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const majorTransitionsInEvolution = {
  id: "019db533-f39f-7367-a256-162f348ccf0b",
  type: "page-type/great-course",
  slug: "major-transitions-in-evolution",
  title: "Major Transitions in Evolution",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 738.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "major-transitions-in-evolution",
      externalLink: "https://www.thegreatcoursesplus.com/major-transitions-in-evolution",
    },
  ],
} as const satisfies GreatCourse
