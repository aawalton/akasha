import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const deliciousDishesForEverySeasonFall = {
  id: "019db533-f39f-7a73-a4d0-b35a87808c8f",
  type: "page-type/great-course",
  slug: "delicious-dishes-for-every-season-fall",
  title: "Delicious Dishes for Every Season: Fall",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 73.8,
  ownProgress: 73.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "delicious-dishes-for-every-season-fall",
      externalLink: "https://plus.thegreatcourses.com/delicious-dishes-for-every-season-fall",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
