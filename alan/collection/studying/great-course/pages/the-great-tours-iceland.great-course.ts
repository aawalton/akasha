import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGreatToursIceland = {
  id: "019db533-f39f-73fa-86aa-bdaf41ec07e9",
  type: "page-type/great-course",
  slug: "the-great-tours-iceland",
  title: "The Great Tours: Iceland",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 564.6,
  ownProgress: 564.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-great-tours-iceland",
      externalLink: "https://www.thegreatcoursesplus.com/the-great-tours-iceland",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
