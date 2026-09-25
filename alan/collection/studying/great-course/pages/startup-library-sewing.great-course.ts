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
} as const satisfies GreatCourse
