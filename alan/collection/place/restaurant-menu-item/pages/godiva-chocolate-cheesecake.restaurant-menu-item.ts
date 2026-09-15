import type { RestaurantMenuItem } from "akasha/alan/collection/place/restaurant-menu-item/restaurant-menu-item.page-type.types.ts"

export const godivaChocolateCheesecake = {
  id: "01a06808-b765-700b-9e98-e46d41ea7f55",
  type: "restaurant-menu-item",
  slug: "godiva-chocolate-cheesecake",
  title: "Godiva Chocolate Cheesecake",
  partOfCollections: ["restaurant-collection/cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
