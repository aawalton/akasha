import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const aNewHistoryOfLife = {
  id: "019db533-f39f-7425-ab63-63a4812c350b",
  type: "page-type/great-course",
  slug: "a-new-history-of-life",
  title: "A New History of Life",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 1069.2,
  ownProgress: 1069.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "a-new-history-of-life",
      externalLink: "https://plus.thegreatcourses.com/a-new-history-of-life",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
