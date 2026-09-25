import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const woodturningBasicsSevenHandyKitchenItems = {
  id: "019db533-f39e-7555-abe3-5e5fbd3209b7",
  type: "page-type/great-course",
  slug: "woodturning-basics-seven-handy-kitchen-items",
  title: "Woodturning Basics: Seven Handy Kitchen Items",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 222,
  ownProgress: 222,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "woodturning-basics-seven-handy-kitchen-items",
      externalLink:
        "https://www.thegreatcoursesplus.com/woodturning-basics-seven-handy-kitchen-items",
    },
  ],
} as const satisfies GreatCourse
