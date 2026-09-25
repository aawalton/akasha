import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const startupLibraryPaintingWithAcrylic = {
  id: "019db533-f39f-740f-91b3-68f4a74e9b47",
  type: "page-type/great-course",
  slug: "startup-library-painting-with-acrylic",
  title: "Startup Library: Painting With Acrylic",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 306.6,
  ownProgress: 306.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "startup-library-painting-with-acrylic",
      externalLink: "https://www.thegreatcoursesplus.com/startup-library-painting-with-acrylic",
    },
  ],
} as const satisfies GreatCourse
