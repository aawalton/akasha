import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const quantumMechanicsThePhysicsOfTheMicroscopicWorld = {
  id: "019db533-f39e-7c3e-b25d-ad8fb27bf981",
  type: "page-type/great-course",
  slug: "quantum-mechanics-the-physics-of-the-microscopic-world",
  title: "Quantum Mechanics: The Physics of the Microscopic World",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 729,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "quantum-mechanics",
      externalLink: "https://www.thegreatcoursesplus.com/quantum-mechanics",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
