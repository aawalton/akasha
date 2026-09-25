import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const charlemagneFatherOfEurope = {
  id: "019db533-f39f-7e43-8bea-c547a5f7f45f",
  type: "page-type/great-course",
  slug: "charlemagne-father-of-europe",
  title: "Charlemagne: Father of Europe",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 387.6,
  ownProgress: 387.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "charlemagne-father-of-europe",
      externalLink: "https://www.thegreatcoursesplus.com/charlemagne-father-of-europe",
    },
  ],
} as const satisfies GreatCourse
