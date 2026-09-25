import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const startupLibraryLearnToDraw = {
  id: "019db533-f39f-741a-92a8-b4521c560a53",
  type: "page-type/great-course",
  slug: "startup-library-learn-to-draw",
  title: "Startup Library: Learn to Draw",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 355.8,
  ownProgress: 355.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "startup-library-learn-to-draw",
      externalLink: "https://www.thegreatcoursesplus.com/startup-library-learn-to-draw",
    },
  ],
} as const satisfies GreatCourse
