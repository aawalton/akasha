import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theVietnamWar = {
  id: "019db533-f3a0-702f-9d46-29165fa44723",
  type: "page-type/great-course",
  slug: "the-vietnam-war",
  title: "The Vietnam War",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 685.2,
  ownProgress: 685.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-vietnam-war",
      externalLink: "https://www.thegreatcoursesplus.com/the-vietnam-war",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
