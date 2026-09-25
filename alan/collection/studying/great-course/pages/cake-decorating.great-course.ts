import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const cakeDecorating = {
  id: "019db533-f39f-7abe-ad2b-3114d270e34f",
  type: "page-type/great-course",
  slug: "cake-decorating",
  title: "Cake Decorating",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 302.4,
  ownProgress: 302.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "cake-decorating",
      externalLink: "https://www.thegreatcoursesplus.com/cake-decorating",
    },
  ],
} as const satisfies GreatCourse
