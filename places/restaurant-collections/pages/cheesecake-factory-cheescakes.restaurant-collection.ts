import type { RestaurantCollection } from "../restaurant-collection.page-type.ts"

export const cheesecakeFactoryCheescakes = {
  id: "01a06808-aeb8-7000-99d8-29479c631712",
  pageTypeSlug: "restaurant-collection",
  slug: "cheesecake-factory-cheescakes",
  title: "Cheesecake Factory Cheescakes",
  partOfSlugs: ["the-cheesecake-factory"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "in-progress",
  rank: "B",
} as const satisfies RestaurantCollection
