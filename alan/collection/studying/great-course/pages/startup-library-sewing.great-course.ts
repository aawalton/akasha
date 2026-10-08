import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const startupLibrarySewing = {
  id: "019db533-f39e-7666-9acf-c78be499bc93",
  type: "page-type/great-course",
  slug: "startup-library-sewing",
  title: "Startup Library: Sewing",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 328.2,
  ownProgress: 328.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "startup-library-sewing",
      externalLink: "https://www.thegreatcoursesplus.com/startup-library-sewing",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
