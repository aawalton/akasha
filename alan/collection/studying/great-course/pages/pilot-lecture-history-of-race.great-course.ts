import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureHistoryOfRace = {
  id: "019db533-f3a0-712c-b6b3-ac9c6801630b",
  type: "page-type/great-course",
  slug: "pilot-lecture-history-of-race",
  title: "Pilot Lecture: History of Race",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 37.8,
  ownProgress: 37.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "history-of-race",
      externalLink: "https://plus.thegreatcourses.com/history-of-race",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
