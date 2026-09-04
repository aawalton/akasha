import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const godivaChocolateCheesecake = {
  id: "01a06808-b765-700b-9e98-e46d41ea7f55",
  pageTypeSlug: "restaurant-menu-item",
  slug: "godiva-chocolate-cheesecake",
  title: "Godiva Chocolate Cheesecake",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
