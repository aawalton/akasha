import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theEvolutionOfAmericanFederalism = {
  id: "019db533-f39f-7792-8d80-c02fe19e233b",
  type: "page-type/great-course",
  slug: "the-evolution-of-american-federalism",
  title: "The Evolution of American Federalism",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 748.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-evolution-of-american-federalism",
      externalLink: "https://www.thegreatcoursesplus.com/the-evolution-of-american-federalism",
    },
  ],
} as const satisfies GreatCourse
