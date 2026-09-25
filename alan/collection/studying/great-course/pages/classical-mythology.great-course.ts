import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const classicalMythology = {
  id: "019db533-f39e-79c4-9b16-fddf360be6a9",
  type: "page-type/great-course",
  slug: "classical-mythology",
  title: "Classical Mythology",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 741,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "classical-mythology",
      externalLink: "https://www.thegreatcoursesplus.com/classical-mythology",
    },
  ],
} as const satisfies GreatCourse
