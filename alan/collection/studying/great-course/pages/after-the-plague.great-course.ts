import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const afterThePlague = {
  id: "019db533-f3a0-75bf-ad96-a046b48bb8c0",
  type: "page-type/great-course",
  slug: "after-the-plague",
  title: "After the Plague",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 627.6,
  ownProgress: 627.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "after-the-plague",
      externalLink: "https://www.thegreatcoursesplus.com/after-the-plague",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
