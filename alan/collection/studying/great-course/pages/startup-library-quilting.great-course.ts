import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const startupLibraryQuilting = {
  id: "019db533-f39e-7402-9e94-579c1f8a08c7",
  type: "page-type/great-course",
  slug: "startup-library-quilting",
  title: "Startup Library: Quilting",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 337.8,
  ownProgress: 337.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "startup-library-quilting",
      externalLink: "https://www.thegreatcoursesplus.com/startup-library-quilting",
    },
  ],
} as const satisfies GreatCourse
