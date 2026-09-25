import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const customBuiltInShelves = {
  id: "019db533-f39e-74d2-86f8-b317d706c4d5",
  type: "page-type/great-course",
  slug: "custom-built-in-shelves",
  title: "Custom Built-In Shelves",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 84.6,
  ownProgress: 84.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "custom-built-in-shelves",
      externalLink: "https://www.thegreatcoursesplus.com/custom-built-in-shelves",
    },
  ],
} as const satisfies GreatCourse
