import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theMedievalLegacy = {
  id: "019db533-f3a0-726b-8734-53b0e1ea95c9",
  type: "page-type/great-course",
  slug: "the-medieval-legacy",
  title: "The Medieval Legacy",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 1099.2,
  ownProgress: 1099.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-medieval-legacy",
      externalLink: "https://www.thegreatcoursesplus.com/the-medieval-legacy",
    },
  ],
} as const satisfies GreatCourse
