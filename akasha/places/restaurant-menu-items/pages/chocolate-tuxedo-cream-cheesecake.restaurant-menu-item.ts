import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const chocolateTuxedoCreamCheesecake = {
  id: "01a06808-b765-7004-85a6-ad26a0d8edd3",
  pageTypeSlug: "restaurant-menu-item",
  slug: "chocolate-tuxedo-cream-cheesecake",
  title: "Chocolate Tuxedo Cream Cheesecake",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
