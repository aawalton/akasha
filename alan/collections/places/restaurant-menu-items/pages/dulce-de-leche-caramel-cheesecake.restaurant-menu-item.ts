import type { RestaurantMenuItem } from "akasha/alan/collections/places/restaurant-menu-items/restaurant-menu-item.page-type.types.ts"

export const dulceDeLecheCaramelCheesecake = {
  id: "01a06808-b765-7008-a372-5060a1ab2f66",
  type: "restaurant-menu-item",
  slug: "dulce-de-leche-caramel-cheesecake",
  title: "Dulce de Leche Caramel Cheesecake",
  partOfCollections: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
