import type { RestaurantMenuItem } from "akasha/alan/collection/place/restaurant-menu-item/restaurant-menu-item.page-type.types.ts"

export const vanillaBeanCheesecake = {
  id: "01a06808-b765-701f-806d-c57bd0955de6",
  type: "restaurant-menu-item",
  slug: "vanilla-bean-cheesecake",
  title: "Vanilla Bean Cheesecake",
  partOfCollections: ["restaurant-collection/cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
