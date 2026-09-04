import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const lemonRaspberryCreamCheesecake = {
  id: "01a06808-b765-700f-a03f-c105f8d40711",
  pageTypeSlug: "restaurant-menu-item",
  slug: "lemon-raspberry-cream-cheesecake",
  title: "Lemon Raspberry Cream Cheesecake",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 3750,
  unitSlug: "words",
  status: "completed",
  rank: "B",
} as const satisfies RestaurantMenuItem
