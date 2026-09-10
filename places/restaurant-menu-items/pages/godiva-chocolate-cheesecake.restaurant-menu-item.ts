import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.types.ts"

export const godivaChocolateCheesecake = {
  id: "01a06808-b765-700b-9e98-e46d41ea7f55",
  pageTypeSlug: "restaurant-menu-item",
  type: "restaurant-menu-item",
  slug: "godiva-chocolate-cheesecake",
  title: "Godiva Chocolate Cheesecake",
  partOfCollections: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
