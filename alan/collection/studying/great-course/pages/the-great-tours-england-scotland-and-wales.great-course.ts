import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGreatToursEnglandScotlandAndWales = {
  id: "019db533-f39f-7bfe-95be-91d2526c9118",
  type: "page-type/great-course",
  slug: "the-great-tours-england-scotland-and-wales",
  title: "The Great Tours: England, Scotland, and Wales",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 1076.4,
  ownProgress: 1076.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-great-tours-england-scotland-and-wales",
      externalLink: "https://plus.thegreatcourses.com/the-great-tours-england-scotland-and-wales",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
