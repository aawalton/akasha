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
      externalLink: "https://www.thegreatcoursesplus.com/a-new-history-of-life",
    },
  ],
} as const satisfies GreatCourse
