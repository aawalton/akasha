import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theManyHiddenWorldsOfQuantumMechanics = {
  id: "019db533-f39e-7b87-87e9-1411bbf7d897",
  type: "page-type/great-course",
  slug: "the-many-hidden-worlds-of-quantum-mechanics",
  title: "The Many Hidden Worlds of Quantum Mechanics",
  status: "in-progress",
  unit: "unit/minutes",
  ownLength: 716.4,
  ownProgress: 59.7,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-many-hidden-worlds-of-quantum-mechanics",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-many-hidden-worlds-of-quantum-mechanics",
    },
  ],
} as const satisfies GreatCourse
