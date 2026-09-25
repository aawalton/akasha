import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureGreatCastlesOfEuropeCaernarfonCastle = {
  id: "019db533-f39f-7e0e-bc54-58a4ac867316",
  type: "page-type/great-course",
  slug: "pilot-lecture-great-castles-of-europe-caernarfon-castle",
  title: "Pilot Lecture: Great Castles of Europe—Caernarfon Castle",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 30,
  ownProgress: 30,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "wondrium-pilots-great-castles-of-europe",
      externalLink: "https://www.thegreatcoursesplus.com/wondrium-pilots-great-castles-of-europe",
    },
  ],
} as const satisfies GreatCourse
