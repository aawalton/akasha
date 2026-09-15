import type { RestaurantMenuItem } from "akasha/alan/collection/place/restaurant-menu-item/restaurant-menu-item.page-type.types.ts"

export const lowLiciousCheesecake = {
  id: "01a06808-b765-7010-9cd5-2c633094a633",
  type: "page-type/restaurant-menu-item",
  slug: "low-licious-cheesecake",
  title: "Low-Licious Cheesecake",
  partOfCollections: ["restaurant-collection/cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
