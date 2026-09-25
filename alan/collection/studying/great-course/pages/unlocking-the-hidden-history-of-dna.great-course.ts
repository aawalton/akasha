import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const unlockingTheHiddenHistoryOfDna = {
  id: "019db533-f39e-7e23-b2cf-fff52c2f4272",
  type: "page-type/great-course",
  slug: "unlocking-the-hidden-history-of-dna",
  title: "Unlocking the Hidden History of DNA",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 383.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "unlocking-the-hidden-history-of-dna",
      externalLink: "https://www.thegreatcoursesplus.com/unlocking-the-hidden-history-of-dna",
    },
  ],
} as const satisfies GreatCourse
