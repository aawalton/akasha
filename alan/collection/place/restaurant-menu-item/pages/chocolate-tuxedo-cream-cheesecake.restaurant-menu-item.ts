import type { RestaurantMenuItem } from "akasha/alan/collection/place/restaurant-menu-item/restaurant-menu-item.page-type.types.ts"

export const chocolateTuxedoCreamCheesecake = {
  id: "01a06808-b765-7004-85a6-ad26a0d8edd3",
  type: "restaurant-menu-item",
  slug: "chocolate-tuxedo-cream-cheesecake",
  title: "Chocolate Tuxedo Cream Cheesecake",
  partOfCollections: ["restaurant-collection/cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
