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
      externalLink: "https://www.thegreatcoursesplus.com/danish-pastries-from-scratch",
    },
  ],
} as const satisfies GreatCourse
