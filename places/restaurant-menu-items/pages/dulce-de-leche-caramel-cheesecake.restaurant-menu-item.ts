import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const dulceDeLecheCaramelCheesecake = {
  id: "01a06808-b765-7008-a372-5060a1ab2f66",
  pageTypeSlug: "restaurant-menu-item",
  slug: "dulce-de-leche-caramel-cheesecake",
  title: "Dulce de Leche Caramel Cheesecake",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
