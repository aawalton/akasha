import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const classicPiesMadeEasy = {
  id: "019db533-f38a-7564-bf26-46316ee43ab5",
  type: "page-type/great-course",
  slug: "classic-pies-made-easy",
  title: "Classic Pies Made Easy",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 163.633333,
  ownProgress: 163.633333,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "classic-pies-made-easy",
      externalLink: "https://plus.thegreatcourses.com/classic-pies-made-easy",
    },
  ],
  createdAt: "2026-04-22T12:39:34.026Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
