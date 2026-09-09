import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const vanillaBeanCheesecake = {
  id: "01a06808-b765-701f-806d-c57bd0955de6",
  pageTypeSlug: "restaurant-menu-item",
  type: "restaurant-menu-item",
  slug: "vanilla-bean-cheesecake",
  title: "Vanilla Bean Cheesecake",
  partOfCollections: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
