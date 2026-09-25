import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureCatherineTheGreat = {
  id: "019db533-f3a0-70fe-8caf-76238464bb48",
  type: "page-type/great-course",
  slug: "pilot-lecture-catherine-the-great",
  title: "Pilot Lecture: Catherine the Great",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 23.4,
  ownProgress: 23.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "wondrium-pilots-catherine-the-great",
      externalLink: "https://www.thegreatcoursesplus.com/wondrium-pilots-catherine-the-great",
    },
  ],
} as const satisfies GreatCourse
