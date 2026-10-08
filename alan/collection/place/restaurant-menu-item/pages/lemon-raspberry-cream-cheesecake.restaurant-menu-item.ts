import type { RestaurantMenuItem } from "akasha/alan/collection/place/restaurant-menu-item/restaurant-menu-item.page-type.types.ts"

export const lemonRaspberryCreamCheesecake = {
  id: "01a06808-b765-700f-a03f-c105f8d40711",
  type: "page-type/restaurant-menu-item",
  slug: "lemon-raspberry-cream-cheesecake",
  title: "Lemon Raspberry Cream Cheesecake",
  partOfCollections: ["restaurant-collection/cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 3750,
  unit: "unit/words",
  status: "completed",
  grade: "B",
  createdAt: "2026-09-03T16:09:56.837Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies RestaurantMenuItem
