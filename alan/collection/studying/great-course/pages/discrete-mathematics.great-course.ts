import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const discreteMathematics = {
  id: "019db533-f3a0-7554-8537-433732f12e3b",
  type: "page-type/great-course",
  slug: "discrete-mathematics",
  title: "Discrete Mathematics",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 764.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/mathematics-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "discrete-mathematics",
      externalLink: "https://www.thegreatcoursesplus.com/discrete-mathematics",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
