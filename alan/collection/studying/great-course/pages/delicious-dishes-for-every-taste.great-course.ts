import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const deliciousDishesForEveryTaste = {
  id: "019db533-f39f-79fe-9734-1d1fd8370315",
  type: "page-type/great-course",
  slug: "delicious-dishes-for-every-taste",
  title: "Delicious Dishes for Every Taste",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 131.4,
  ownProgress: 131.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "delicious-dishes-for-every-taste",
      externalLink: "https://www.thegreatcoursesplus.com/delicious-dishes-for-every-taste",
    },
  ],
} as const satisfies GreatCourse
