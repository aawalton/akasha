import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const identityInTheAgeOfAncestralDna = {
  id: "019db533-f39e-7d1b-8144-124b48ffb899",
  type: "page-type/great-course",
  slug: "identity-in-the-age-of-ancestral-dna",
  title: "Identity in the Age of Ancestral DNA",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 352.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "identity-in-the-age-of-ancestral-dna",
      externalLink: "https://www.thegreatcoursesplus.com/identity-in-the-age-of-ancestral-dna",
    },
  ],
} as const satisfies GreatCourse
