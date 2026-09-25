import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const exploringTheMayanWorld = {
  id: "019db533-f3a0-74ae-834f-0d3bd9b171a7",
  type: "page-type/great-course",
  slug: "exploring-the-mayan-world",
  title: "Exploring the Mayan World",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 205.8,
  ownProgress: 205.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "exploring-the-mayan-world",
      externalLink: "https://www.thegreatcoursesplus.com/exploring-the-mayan-world",
    },
  ],
} as const satisfies GreatCourse
