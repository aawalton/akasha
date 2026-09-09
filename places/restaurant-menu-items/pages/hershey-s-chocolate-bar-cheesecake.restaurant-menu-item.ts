import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const hersheySChocolateBarCheesecake = {
  id: "01a06808-b765-700c-b92a-5c7713009c46",
  pageTypeSlug: "restaurant-menu-item",
  type: "restaurant-menu-item",
  slug: "hershey-s-chocolate-bar-cheesecake",
  title: "Hershey's Chocolate Bar Cheesecake",
  partOfCollections: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
