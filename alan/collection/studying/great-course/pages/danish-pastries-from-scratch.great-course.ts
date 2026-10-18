import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const danishPastriesFromScratch = {
  id: "019db533-f38a-7553-a44a-c0d39a2492c4",
  type: "page-type/great-course",
  slug: "danish-pastries-from-scratch",
  title: "Danish Pastries From Scratch",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 171.15,
  ownProgress: 171.15,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "danish-pastries-from-scratch",
      externalLink: "https://plus.thegreatcourses.com/danish-pastries-from-scratch",
    },
  ],
  createdAt: "2026-04-22T12:39:34.026Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
