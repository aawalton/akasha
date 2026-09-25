import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theAmericanRevolution = {
  id: "019db533-f39f-7973-ab99-e014d7379d42",
  type: "page-type/great-course",
  slug: "the-american-revolution",
  title: "The American Revolution",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 734.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-american-revolution",
      externalLink: "https://www.thegreatcoursesplus.com/the-american-revolution",
    },
  ],
} as const satisfies GreatCourse
