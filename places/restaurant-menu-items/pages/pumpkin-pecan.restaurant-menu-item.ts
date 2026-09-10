import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.types.ts"

export const pumpkinPecan = {
  id: "01a06808-b765-7018-bae5-de1cc92a2ccc",
  pageTypeSlug: "restaurant-menu-item",
  type: "restaurant-menu-item",
  slug: "pumpkin-pecan",
  title: "Pumpkin Pecan",
  partOfCollections: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
