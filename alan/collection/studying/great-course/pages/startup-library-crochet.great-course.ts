import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const startupLibraryCrochet = {
  id: "019db533-f39e-74ff-a67a-f3d31d81a856",
  type: "page-type/great-course",
  slug: "startup-library-crochet",
  title: "Startup Library: Crochet",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 275.4,
  ownProgress: 275.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "startup-library-crochet",
      externalLink: "https://plus.thegreatcourses.com/startup-library-crochet",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
