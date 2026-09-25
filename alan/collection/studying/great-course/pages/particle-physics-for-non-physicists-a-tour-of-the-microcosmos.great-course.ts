import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const particlePhysicsForNonPhysicistsATourOfTheMicrocosmos = {
  id: "01a0d3af-361c-7bb6-b9c1-b5e625b8a407",
  type: "page-type/great-course",
  slug: "particle-physics-for-non-physicists-a-tour-of-the-microcosmos",
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "particle-physics-for-non-physicists-a-tour-of-the-microcosmos",
      externalLink:
        "https://plus.thegreatcourses.com/particle-physics-for-non-physicists-a-tour-of-the-microcosmos",
    },
  ],
  title: "Particle Physics for Non-Physicists: A Tour of the Microcosmos",
} as const satisfies GreatCourse
