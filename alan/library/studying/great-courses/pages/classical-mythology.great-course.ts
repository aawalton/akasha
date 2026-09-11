import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const classicalMythology = {
  id: "019db533-f39e-79c4-9b16-fddf360be6a9",
  type: "great-course",
  slug: "classical-mythology",
  title: "Classical Mythology",
  status: "not-started",
  unit: "minutes",
  ownLength: 741,
  ownProgress: 0,
  partOfCollections: ["all-great-courses", "literature-great-courses"],
  source: "the-great-courses",
  externalId: "classical-mythology",
  externalLink: "https://www.thegreatcoursesplus.com/classical-mythology",
} as const satisfies GreatCourse
