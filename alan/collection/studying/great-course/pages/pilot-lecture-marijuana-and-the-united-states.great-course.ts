import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureMarijuanaAndTheUnitedStates = {
  id: "019db533-f39f-7953-a0fb-a5144a0dd367",
  type: "page-type/great-course",
  slug: "pilot-lecture-marijuana-and-the-united-states",
  title: "Pilot Lecture: Marijuana and the United States",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 31.8,
  ownProgress: 31.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "wondrium-pilots-marijuana-and-the-united-states",
      externalLink:
        "https://www.thegreatcoursesplus.com/wondrium-pilots-marijuana-and-the-united-states",
    },
  ],
} as const satisfies GreatCourse
