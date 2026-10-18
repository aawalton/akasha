import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const famousGreeks = {
  id: "019db533-f3a0-717f-9c03-9ed983ccf9a5",
  type: "page-type/great-course",
  slug: "famous-greeks",
  title: "Famous Greeks",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 736.8,
  ownProgress: 736.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "famous-greeks",
      externalLink: "https://plus.thegreatcourses.com/famous-greeks",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
