import type { RestaurantMenuItem } from "akasha/alan/collection/places/restaurant-menu-item/restaurant-menu-item.page-type.types.ts"

export const whiteChocolateRaspberryTruffle = {
  id: "01a06808-b765-7021-8d65-00d807276572",
  type: "restaurant-menu-item",
  slug: "white-chocolate-raspberry-truffle",
  title: "White Chocolate Raspberry Truffle",
  partOfCollections: ["restaurant-collection/cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
