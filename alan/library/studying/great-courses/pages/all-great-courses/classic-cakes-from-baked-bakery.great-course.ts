import type { GreatCourse } from "../../great-course.page-type.ts"

export const classicCakesFromBakedBakery = {
  id: "019db533-f389-715b-879d-7fa013c9e1f3",
  pageTypeSlug: "great-course",
  slug: "classic-cakes-from-baked-bakery",
  title: "Classic Cakes From Baked Bakery",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 111.616667,
  ownProgress: 111.616667,
  partOfSlugs: ["all-great-courses"],
  source: "the-great-courses",
  externalId: "classic-cakes-from-baked-bakery",
  externalLink: "https://www.thegreatcoursesplus.com/classic-cakes-from-baked-bakery",
} as const satisfies GreatCourse
