import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theAncientOlympics = {
  id: "019db533-f3a0-70f0-9f9f-c293dc29dab8",
  type: "page-type/great-course",
  slug: "the-ancient-olympics",
  title: "The Ancient Olympics",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 27,
  ownProgress: 27,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-ancient-olympics",
      externalLink: "https://www.thegreatcoursesplus.com/the-ancient-olympics",
    },
  ],
} as const satisfies GreatCourse
