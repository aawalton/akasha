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
      externalLink: "https://www.thegreatcoursesplus.com/startup-library-crochet",
    },
  ],
} as const satisfies GreatCourse
