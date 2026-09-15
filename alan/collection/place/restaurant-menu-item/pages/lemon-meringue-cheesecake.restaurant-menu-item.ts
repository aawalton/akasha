import type { RestaurantMenuItem } from "akasha/alan/collection/place/restaurant-menu-item/restaurant-menu-item.page-type.types.ts"

export const lemonMeringueCheesecake = {
  id: "01a06808-b765-700e-8304-932ae1450b38",
  type: "page-type/restaurant-menu-item",
  slug: "lemon-meringue-cheesecake",
  title: "Lemon Meringue Cheesecake",
  partOfCollections: ["restaurant-collection/cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
