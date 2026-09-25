import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theArchitectureOfPowerGreatPalacesOfTheAncientWorld = {
  id: "019db533-f3a0-72e2-862d-cf191299ce12",
  type: "page-type/great-course",
  slug: "the-architecture-of-power-great-palaces-of-the-ancient-world",
  title: "The Architecture of Power: Great Palaces of the Ancient World",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 777,
  ownProgress: 777,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-architecture-of-power-great-palaces-of-the-ancient-world",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-architecture-of-power-great-palaces-of-the-ancient-world",
    },
  ],
} as const satisfies GreatCourse
