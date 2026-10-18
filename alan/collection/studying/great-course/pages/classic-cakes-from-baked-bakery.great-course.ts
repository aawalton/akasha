import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const classicCakesFromBakedBakery = {
  id: "019db533-f389-715b-879d-7fa013c9e1f3",
  type: "page-type/great-course",
  slug: "classic-cakes-from-baked-bakery",
  title: "Classic Cakes From Baked Bakery",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 111.616667,
  ownProgress: 111.616667,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "classic-cakes-from-baked-bakery",
      externalLink: "https://plus.thegreatcourses.com/classic-cakes-from-baked-bakery",
    },
  ],
  createdAt: "2026-04-22T12:39:34.025Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
