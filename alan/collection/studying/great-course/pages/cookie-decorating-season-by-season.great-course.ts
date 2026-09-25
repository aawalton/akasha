import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const cookieDecoratingSeasonBySeason = {
  id: "019db533-f39f-7a13-9e39-cea41e8b8c9d",
  type: "page-type/great-course",
  slug: "cookie-decorating-season-by-season",
  title: "Cookie Decorating Season by Season",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 123,
  ownProgress: 123,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "cookie-decorating-season-by-season",
      externalLink: "https://www.thegreatcoursesplus.com/cookie-decorating-season-by-season",
    },
  ],
} as const satisfies GreatCourse
