import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const startupLibraryBakingAndPastry = {
  id: "019db533-f39f-78e8-a180-1e7fa454c651",
  type: "page-type/great-course",
  slug: "startup-library-baking-and-pastry",
  title: "Startup Library: Baking & Pastry",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 223.2,
  ownProgress: 223.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "startup-library-baking-pastry",
      externalLink: "https://www.thegreatcoursesplus.com/startup-library-baking-pastry",
    },
  ],
} as const satisfies GreatCourse
