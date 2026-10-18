import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theHistoryAndArchaeologyOfTheBible = {
  id: "019db533-f39f-7bde-a8e0-200d8d98f6f4",
  type: "page-type/great-course",
  slug: "the-history-and-archaeology-of-the-bible",
  title: "The History and Archaeology of the Bible",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 670.8,
  ownProgress: 670.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-history-and-archaeology-of-the-bible",
      externalLink: "https://plus.thegreatcourses.com/the-history-and-archaeology-of-the-bible",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
