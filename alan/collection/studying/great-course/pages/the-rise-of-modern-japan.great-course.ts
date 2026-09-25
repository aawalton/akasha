import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theRiseOfModernJapan = {
  id: "019db533-f39f-7c90-a11b-d70074a5d14a",
  type: "page-type/great-course",
  slug: "the-rise-of-modern-japan",
  title: "The Rise of Modern Japan",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 353.4,
  ownProgress: 353.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-rise-of-modern-japan",
      externalLink: "https://www.thegreatcoursesplus.com/the-rise-of-modern-japan",
    },
  ],
} as const satisfies GreatCourse
