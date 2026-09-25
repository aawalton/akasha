import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureTheHaitianRevolution = {
  id: "019db533-f39f-75c0-bc78-b825e14dbd78",
  type: "page-type/great-course",
  slug: "pilot-lecture-the-haitian-revolution",
  title: "Pilot Lecture: The Haitian Revolution",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 29.4,
  ownProgress: 29.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "wondrium-pilots-the-haitian-revolution",
      externalLink: "https://www.thegreatcoursesplus.com/wondrium-pilots-the-haitian-revolution",
    },
  ],
} as const satisfies GreatCourse
