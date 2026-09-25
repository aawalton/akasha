import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const superstringTheoryTheDnaOfReality = {
  id: "019db533-f39e-7da3-8ca5-bee89348cb21",
  type: "page-type/great-course",
  slug: "superstring-theory-the-dna-of-reality",
  title: "Superstring Theory: The DNA of Reality",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 730.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "superstring-theory-the-dna-of-reality",
      externalLink: "https://www.thegreatcoursesplus.com/superstring-theory-the-dna-of-reality",
    },
  ],
} as const satisfies GreatCourse
