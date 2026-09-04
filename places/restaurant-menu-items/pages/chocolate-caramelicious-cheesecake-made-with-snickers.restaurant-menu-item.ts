import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const chocolateCarameliciousCheesecakeMadeWithSnickers = {
  id: "01a06808-b765-7002-b1ec-f1708deb8c48",
  pageTypeSlug: "restaurant-menu-item",
  slug: "chocolate-caramelicious-cheesecake-made-with-snickers",
  title: "Chocolate Caramelicious Cheesecake Made with Snickers",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
