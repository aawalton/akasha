import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureTheRiseOfTheSamurai = {
  id: "019db533-f39f-7d1a-8b4d-327b882f338c",
  type: "page-type/great-course",
  slug: "pilot-lecture-the-rise-of-the-samurai",
  title: "Pilot Lecture: The Rise of the Samurai",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 36.6,
  ownProgress: 36.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "pilot-lecture-the-rise-of-the-samurai",
      externalLink: "https://www.thegreatcoursesplus.com/pilot-lecture-the-rise-of-the-samurai",
    },
  ],
} as const satisfies GreatCourse
