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
      externalLink: "https://plus.thegreatcourses.com/charlemagne-father-of-europe",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
