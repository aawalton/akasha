import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const betterBasicsForExceptionalCookies = {
  id: "019db533-f39f-7b28-bf11-c9f93bbf2e6c",
  type: "page-type/great-course",
  slug: "better-basics-for-exceptional-cookies",
  title: "Better Basics for Exceptional Cookies",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 166.8,
  ownProgress: 166.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "better-basics-for-exceptional-cookies",
      externalLink: "https://www.thegreatcoursesplus.com/better-basics-for-exceptional-cookies",
    },
  ],
} as const satisfies GreatCourse
