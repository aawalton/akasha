import type { RestaurantMenuItem } from "akasha/alan/collection/place/restaurant-menu-item/restaurant-menu-item.page-type.types.ts"

export const caramelPecanTurtleCheesecake = {
  id: "01a06808-b765-7000-a172-538ca66dc45e",
  type: "restaurant-menu-item",
  slug: "caramel-pecan-turtle-cheesecake",
  title: "Caramel Pecan Turtle Cheesecake",
  partOfCollections: ["restaurant-collection/cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 3750,
  unit: "unit/words",
  status: "completed",
  rank: "B",
} as const satisfies RestaurantMenuItem
