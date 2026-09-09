import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const whiteChocolateRaspberryTruffle = {
  id: "01a06808-b765-7021-8d65-00d807276572",
  pageTypeSlug: "restaurant-menu-item",
  type: "restaurant-menu-item",
  slug: "white-chocolate-raspberry-truffle",
  title: "White Chocolate Raspberry Truffle",
  partOfCollections: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
