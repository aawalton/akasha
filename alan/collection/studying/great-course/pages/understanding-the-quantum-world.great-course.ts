import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingTheQuantumWorld = {
  id: "019db533-f39f-707f-8dd8-6c2b1cfa68af",
  type: "page-type/great-course",
  slug: "understanding-the-quantum-world",
  title: "Understanding the Quantum World",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 722.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-the-quantum-world",
      externalLink: "https://www.thegreatcoursesplus.com/understanding-the-quantum-world",
    },
  ],
} as const satisfies GreatCourse
