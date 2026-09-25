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
      externalLink: "https://www.thegreatcoursesplus.com/the-history-and-archaeology-of-the-bible",
    },
  ],
} as const satisfies GreatCourse
