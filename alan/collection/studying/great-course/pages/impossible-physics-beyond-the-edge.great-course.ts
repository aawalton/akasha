import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const impossiblePhysicsBeyondTheEdge = {
  id: "019db533-f39e-7eee-8ba7-4201cf501eba",
  type: "page-type/great-course",
  slug: "impossible-physics-beyond-the-edge",
  title: "Impossible: Physics Beyond the Edge",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 726,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "impossible-physics-beyond-the-edge",
      externalLink: "https://plus.thegreatcourses.com/impossible-physics-beyond-the-edge",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
