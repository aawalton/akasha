import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theFoundationsOfWesternCivilization = {
  id: "019db533-f3a0-70d6-9ae4-434347b80463",
  type: "page-type/great-course",
  slug: "the-foundations-of-western-civilization",
  title: "The Foundations of Western Civilization",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1478.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-foundations-of-western-civilization",
      externalLink: "https://www.thegreatcoursesplus.com/the-foundations-of-western-civilization",
    },
  ],
} as const satisfies GreatCourse
