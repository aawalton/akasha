import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.types.ts"

export const lemonMeringueCheesecake = {
  id: "01a06808-b765-700e-8304-932ae1450b38",
  pageTypeSlug: "restaurant-menu-item",
  type: "restaurant-menu-item",
  slug: "lemon-meringue-cheesecake",
  title: "Lemon Meringue Cheesecake",
  partOfCollections: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
