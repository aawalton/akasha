import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.types.ts"

export const tiramisuCheesecake = {
  id: "01a06808-b765-701b-9823-740ea02c93d1",
  pageTypeSlug: "restaurant-menu-item",
  type: "restaurant-menu-item",
  slug: "tiramisu-cheesecake",
  title: "Tiramisu Cheesecake",
  partOfCollections: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
