import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureTheTimuridEmpire = {
  id: "019db533-f3a0-730d-8dfb-89ca762720ae",
  type: "page-type/great-course",
  slug: "pilot-lecture-the-timurid-empire",
  title: "Pilot Lecture: The Timurid Empire",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 34.8,
  ownProgress: 34.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "wondrium-pilots-the-timurid-empire",
      externalLink: "https://www.thegreatcoursesplus.com/wondrium-pilots-the-timurid-empire",
    },
  ],
} as const satisfies GreatCourse
