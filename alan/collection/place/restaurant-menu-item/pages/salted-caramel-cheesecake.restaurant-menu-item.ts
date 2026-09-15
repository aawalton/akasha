import type { RestaurantMenuItem } from "akasha/alan/collection/place/restaurant-menu-item/restaurant-menu-item.page-type.types.ts"

export const saltedCaramelCheesecake = {
  id: "01a06808-b765-701a-b9a1-8f997b9e7ad0",
  type: "page-type/restaurant-menu-item",
  slug: "salted-caramel-cheesecake",
  title: "Salted Caramel Cheesecake",
  partOfCollections: ["restaurant-collection/cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
