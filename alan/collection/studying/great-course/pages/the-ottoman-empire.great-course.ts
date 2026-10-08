import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theOttomanEmpire = {
  id: "019db533-f3a0-704d-ab44-f9eabb76b3fb",
  type: "page-type/great-course",
  slug: "the-ottoman-empire",
  title: "The Ottoman Empire",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1135.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-ottoman-empire",
      externalLink: "https://www.thegreatcoursesplus.com/the-ottoman-empire",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
