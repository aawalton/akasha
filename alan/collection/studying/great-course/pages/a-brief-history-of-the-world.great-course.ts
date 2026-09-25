import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const aBriefHistoryOfTheWorld = {
  id: "019db533-f3a0-7226-9c31-eb82b708497b",
  type: "page-type/great-course",
  slug: "a-brief-history-of-the-world",
  title: "A Brief History of the World",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 1140.6,
  ownProgress: 1140.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "a-brief-history-of-the-world",
      externalLink: "https://www.thegreatcoursesplus.com/a-brief-history-of-the-world",
    },
  ],
} as const satisfies GreatCourse
