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
        "https://plus.thegreatcourses.com/the-great-tours-greece-and-turkey-from-athens-to-istanbul",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
