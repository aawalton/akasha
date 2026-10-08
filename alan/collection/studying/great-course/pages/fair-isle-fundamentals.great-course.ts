import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const fairIsleFundamentals = {
  id: "019db533-f39e-76e2-ad3c-aaf06f68e6e3",
  type: "page-type/great-course",
  slug: "fair-isle-fundamentals",
  title: "Fair Isle Fundamentals",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 116.4,
  ownProgress: 116.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "fair-isle-fundamentals",
      externalLink: "https://www.thegreatcoursesplus.com/fair-isle-fundamentals",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
