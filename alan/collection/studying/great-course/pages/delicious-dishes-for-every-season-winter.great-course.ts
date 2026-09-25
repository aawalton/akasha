import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const deliciousDishesForEverySeasonWinter = {
  id: "019db533-f39f-79e8-8c21-b683855665fc",
  type: "page-type/great-course",
  slug: "delicious-dishes-for-every-season-winter",
  title: "Delicious Dishes for Every Season: Winter",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 57,
  ownProgress: 57,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "delicious-dishes-for-every-season-winter",
      externalLink: "https://www.thegreatcoursesplus.com/delicious-dishes-for-every-season-winter",
    },
  ],
} as const satisfies GreatCourse
