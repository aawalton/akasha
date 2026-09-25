import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGreatToursGreeceAndTurkeyFromAthensToIstanbul = {
  id: "019db533-f39f-7716-9671-4b55f1db1c16",
  type: "page-type/great-course",
  slug: "the-great-tours-greece-and-turkey-from-athens-to-istanbul",
  title: "The Great Tours: Greece and Turkey, from Athens to Istanbul",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 749.4,
  ownProgress: 749.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-great-tours-greece-and-turkey-from-athens-to-istanbul",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-great-tours-greece-and-turkey-from-athens-to-istanbul",
    },
  ],
} as const satisfies GreatCourse
