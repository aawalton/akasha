import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureAlaricTheGothAndTheSackOfRome = {
  id: "019db533-f39f-7d79-9f93-b2c51ce54630",
  type: "page-type/great-course",
  slug: "pilot-lecture-alaric-the-goth-and-the-sack-of-rome",
  title: "Pilot Lecture: Alaric the Goth and the Sack of Rome",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 32.4,
  ownProgress: 32.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "pilot-lecture-alaric-the-goth-and-the-sack-of-rome",
      externalLink:
        "https://www.thegreatcoursesplus.com/pilot-lecture-alaric-the-goth-and-the-sack-of-rome",
    },
  ],
} as const satisfies GreatCourse
