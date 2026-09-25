import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const deliciousDishesForEverySeasonSummer = {
  id: "019db533-f39f-7a08-ad16-bf14fa620328",
  type: "page-type/great-course",
  slug: "delicious-dishes-for-every-season-summer",
  title: "Delicious Dishes for Every Season: Summer",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 68.4,
  ownProgress: 68.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "delicious-dishes-for-every-season-summer",
      externalLink: "https://www.thegreatcoursesplus.com/delicious-dishes-for-every-season-summer",
    },
  ],
} as const satisfies GreatCourse
