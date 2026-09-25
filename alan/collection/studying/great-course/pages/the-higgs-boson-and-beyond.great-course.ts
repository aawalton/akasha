import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theHiggsBosonAndBeyond = {
  id: "019db533-f39e-7b77-85b0-5ba1ea414544",
  type: "page-type/great-course",
  slug: "the-higgs-boson-and-beyond",
  title: "The Higgs Boson and Beyond",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 382.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-higgs-boson-and-beyond",
      externalLink: "https://www.thegreatcoursesplus.com/the-higgs-boson-and-beyond",
    },
  ],
} as const satisfies GreatCourse
