import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const nuclearPhysicsExplained = {
  id: "019db533-f39f-711f-a376-7036f650d73f",
  type: "page-type/great-course",
  slug: "nuclear-physics-explained",
  title: "Nuclear Physics Explained",
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
      externalId: "nuclear-physics-explained",
      externalLink: "https://plus.thegreatcourses.com/nuclear-physics-explained",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
