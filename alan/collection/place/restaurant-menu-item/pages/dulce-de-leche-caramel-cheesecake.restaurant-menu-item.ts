import type { RestaurantMenuItem } from "akasha/alan/collection/place/restaurant-menu-item/restaurant-menu-item.page-type.types.ts"

export const dulceDeLecheCaramelCheesecake = {
  id: "01a06808-b765-7008-a372-5060a1ab2f66",
  type: "page-type/restaurant-menu-item",
  slug: "dulce-de-leche-caramel-cheesecake",
  title: "Dulce de Leche Caramel Cheesecake",
  partOfCollections: ["restaurant-collection/cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:56.837Z",
  updatedAt: "2026-09-15T16:43:13.000Z",
} as const satisfies RestaurantMenuItem
