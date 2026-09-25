import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theRealAncientEgypt = {
  id: "019db533-f3a0-7061-9ec1-47c88339e799",
  type: "page-type/great-course",
  slug: "the-real-ancient-egypt",
  title: "The Real Ancient Egypt",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 235.2,
  ownProgress: 235.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-real-ancient-egypt",
      externalLink: "https://www.thegreatcoursesplus.com/the-real-ancient-egypt",
    },
  ],
} as const satisfies GreatCourse
