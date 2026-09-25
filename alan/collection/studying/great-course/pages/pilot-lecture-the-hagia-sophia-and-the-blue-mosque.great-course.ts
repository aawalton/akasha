import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureTheHagiaSophiaAndTheBlueMosque = {
  id: "019db533-f3a0-7108-a015-890aac3f369f",
  type: "page-type/great-course",
  slug: "pilot-lecture-the-hagia-sophia-and-the-blue-mosque",
  title: "Pilot Lecture: The Hagia Sophia and the Blue Mosque",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 28.8,
  ownProgress: 28.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "wondrium-pilots-the-hagia-sophia-and-the-blue-mosque",
      externalLink:
        "https://www.thegreatcoursesplus.com/wondrium-pilots-the-hagia-sophia-and-the-blue-mosque",
    },
  ],
} as const satisfies GreatCourse
