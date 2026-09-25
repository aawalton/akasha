import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureABriefHistoryOfCuba = {
  id: "019db533-f392-76e7-b150-3cbc37c02c40",
  type: "page-type/great-course",
  slug: "pilot-lecture-a-brief-history-of-cuba",
  title: "Pilot Lecture: A Brief History of Cuba",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 37.8,
  ownProgress: 37.8,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "pilot-lecture-a-brief-history-of-cuba",
      externalLink: "https://www.thegreatcoursesplus.com/pilot-lecture-a-brief-history-of-cuba",
    },
  ],
} as const satisfies GreatCourse
