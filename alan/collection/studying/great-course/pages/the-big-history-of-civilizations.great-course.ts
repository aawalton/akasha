import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theBigHistoryOfCivilizations = {
  id: "019db533-f3a0-71ee-b6ad-db6edc9d3e68",
  type: "page-type/great-course",
  slug: "the-big-history-of-civilizations",
  title: "The Big History of Civilizations",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1075.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-big-history-of-civilizations",
      externalLink: "https://www.thegreatcoursesplus.com/the-big-history-of-civilizations",
    },
  ],
} as const satisfies GreatCourse
