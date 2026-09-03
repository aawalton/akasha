import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const pumpkinPecan = {
  id: "01a06808-b765-7018-bae5-de1cc92a2ccc",
  pageTypeSlug: "restaurant-menu-item",
  slug: "pumpkin-pecan",
  title: "Pumpkin Pecan",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
