import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theConservativeTradition = {
  id: "019db533-f3a0-70f4-a718-92637f0c9581",
  type: "page-type/great-course",
  slug: "the-conservative-tradition",
  title: "The Conservative Tradition",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1097.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-conservative-tradition",
      externalLink: "https://www.thegreatcoursesplus.com/the-conservative-tradition",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
