import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const tiramisuCheesecake = {
  id: "01a06808-b765-701b-9823-740ea02c93d1",
  pageTypeSlug: "restaurant-menu-item",
  slug: "tiramisu-cheesecake",
  title: "Tiramisu Cheesecake",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
