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
      externalLink: "https://www.thegreatcoursesplus.com/classic-cakes-from-baked-bakery",
    },
  ],
} as const satisfies GreatCourse
