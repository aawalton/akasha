import type { RestaurantMenuItem } from "akasha/alan/collections/places/restaurant-menu-items/restaurant-menu-item.page-type.types.ts"

export const pumpkin = {
  id: "01a06808-b765-7017-a082-3d091e8db5d8",
  type: "restaurant-menu-item",
  slug: "pumpkin",
  title: "Pumpkin",
  partOfCollections: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
