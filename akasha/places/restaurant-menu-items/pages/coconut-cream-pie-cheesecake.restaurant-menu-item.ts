import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const coconutCreamPieCheesecake = {
  id: "01a06808-b765-7006-9a50-fcce090d43a9",
  pageTypeSlug: "restaurant-menu-item",
  slug: "coconut-cream-pie-cheesecake",
  title: "Coconut Cream Pie Cheesecake",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
