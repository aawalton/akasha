import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureWhatIsPain = {
  id: "019db533-f39f-7134-a076-4cbe8f0ae676",
  type: "page-type/great-course",
  slug: "pilot-lecture-what-is-pain",
  title: "Pilot Lecture: What Is Pain?",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 29.4,
  ownProgress: 29.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "wondrium-pilots-what-is-pain",
      externalLink: "https://www.thegreatcoursesplus.com/wondrium-pilots-what-is-pain",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
