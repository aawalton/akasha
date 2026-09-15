import type { RestaurantMenuItem } from "akasha/alan/collection/place/restaurant-menu-item/restaurant-menu-item.page-type.types.ts"

export const celebrationCheesecake = {
  id: "01a06808-b765-7001-804a-798f881c42f6",
  type: "restaurant-menu-item",
  slug: "celebration-cheesecake",
  title: "Celebration Cheesecake",
  partOfCollections: ["restaurant-collection/cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
