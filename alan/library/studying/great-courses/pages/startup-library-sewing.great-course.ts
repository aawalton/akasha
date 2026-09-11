import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const startupLibrarySewing = {
  id: "019db533-f39e-7666-9acf-c78be499bc93",
  type: "great-course",
  slug: "startup-library-sewing",
  title: "Startup Library: Sewing",
  status: "completed",
  rank: "D",
  unit: "minutes",
  ownLength: 328.2,
  ownProgress: 328.2,
  partOfCollections: ["all-great-courses", "hobby-and-personal-pursuits-great-courses"],
  source: "the-great-courses",
  externalId: "startup-library-sewing",
  externalLink: "https://www.thegreatcoursesplus.com/startup-library-sewing",
} as const satisfies GreatCourse
