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
      externalLink: "https://plus.thegreatcourses.com/delicious-dishes-for-every-season-spring",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
