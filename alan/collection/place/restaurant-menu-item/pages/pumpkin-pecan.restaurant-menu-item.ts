import type { RestaurantMenuItem } from "akasha/alan/collection/place/restaurant-menu-item/restaurant-menu-item.page-type.types.ts"

export const pumpkinPecan = {
  id: "01a06808-b765-7018-bae5-de1cc92a2ccc",
  type: "page-type/restaurant-menu-item",
  slug: "pumpkin-pecan",
  title: "Pumpkin Pecan",
  partOfCollections: ["restaurant-collection/cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
