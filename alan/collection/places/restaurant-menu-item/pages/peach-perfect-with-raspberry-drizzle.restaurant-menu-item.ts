import type { RestaurantMenuItem } from "akasha/alan/collection/places/restaurant-menu-item/restaurant-menu-item.page-type.types.ts"

export const peachPerfectWithRaspberryDrizzle = {
  id: "01a06808-b765-7015-a864-6e69a4972767",
  type: "restaurant-menu-item",
  slug: "peach-perfect-with-raspberry-drizzle",
  title: "Peach Perfect with Raspberry Drizzle",
  partOfCollections: ["restaurant-collection/cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
