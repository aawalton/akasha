import type { RestaurantMenuItem } from "akasha/alan/collection/place/restaurant-menu-item/restaurant-menu-item.page-type.types.ts"

export const chocolateCarameliciousCheesecakeMadeWithSnickers = {
  id: "01a06808-b765-7002-b1ec-f1708deb8c48",
  type: "page-type/restaurant-menu-item",
  slug: "chocolate-caramelicious-cheesecake-made-with-snickers",
  title: "Chocolate Caramelicious Cheesecake Made with Snickers",
  partOfCollections: ["restaurant-collection/cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
