import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theRealHistoryOfPirates = {
  id: "019db533-f39f-7812-9727-a259d897fa5d",
  type: "page-type/great-course",
  slug: "the-real-history-of-pirates",
  title: "The Real History of Pirates",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 658.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-real-history-of-pirates",
      externalLink: "https://www.thegreatcoursesplus.com/the-real-history-of-pirates",
    },
  ],
} as const satisfies GreatCourse
