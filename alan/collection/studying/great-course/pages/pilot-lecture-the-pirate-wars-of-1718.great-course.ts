import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureThePirateWarsOf1718 = {
  id: "019db533-f39f-7d8e-87e4-0702ae8e7b6f",
  type: "page-type/great-course",
  slug: "pilot-lecture-the-pirate-wars-of-1718",
  title: "Pilot Lecture: The Pirate Wars of 1718",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 33.6,
  ownProgress: 33.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-pirate-wars-of-1718",
      externalLink: "https://www.thegreatcoursesplus.com/the-pirate-wars-of-1718",
    },
  ],
} as const satisfies GreatCourse
