import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const deliciousDishesForEverySeasonSpring = {
  id: "019db533-f39f-7a68-9869-bea454d3cbff",
  type: "page-type/great-course",
  slug: "delicious-dishes-for-every-season-spring",
  title: "Delicious Dishes for Every Season: Spring",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 59.4,
  ownProgress: 59.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "delicious-dishes-for-every-season-spring",
      externalLink: "https://www.thegreatcoursesplus.com/delicious-dishes-for-every-season-spring",
    },
  ],
} as const satisfies GreatCourse
