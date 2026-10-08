import type { RestaurantMenuItem } from "akasha/alan/collection/place/restaurant-menu-item/restaurant-menu-item.page-type.types.ts"

export const chocolateMousseCheesecake = {
  id: "01a06808-b765-7003-b627-a6b20d732017",
  type: "page-type/restaurant-menu-item",
  slug: "chocolate-mousse-cheesecake",
  title: "Chocolate Mousse Cheesecake",
  partOfCollections: ["restaurant-collection/cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:56.837Z",
  updatedAt: "2026-09-15T16:43:13.000Z",
} as const satisfies RestaurantMenuItem
