import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const whereOurFoodReallyComesFrom = {
  id: "019db533-f39f-7655-bf4c-d1bac47a0286",
  type: "page-type/great-course",
  slug: "where-our-food-really-comes-from",
  title: "Where Our Food Really Comes From",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 193.8,
  ownProgress: 193.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "where-our-food-really-comes-from",
      externalLink: "https://plus.thegreatcourses.com/where-our-food-really-comes-from",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
