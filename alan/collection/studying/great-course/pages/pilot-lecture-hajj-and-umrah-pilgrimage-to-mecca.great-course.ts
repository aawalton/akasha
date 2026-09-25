import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureHajjAndUmrahPilgrimageToMecca = {
  id: "019db533-f39e-7a94-927b-860095f7ae29",
  type: "page-type/great-course",
  slug: "pilot-lecture-hajj-and-umrah-pilgrimage-to-mecca",
  title: "Pilot Lecture: Hajj and Umrah - Pilgrimage to Mecca",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 32.4,
  ownProgress: 32.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "wondrium-pilots-hajj-and-umrah-pilgrimage-to-mecca",
      externalLink:
        "https://www.thegreatcoursesplus.com/wondrium-pilots-hajj-and-umrah-pilgrimage-to-mecca",
    },
  ],
} as const satisfies GreatCourse
