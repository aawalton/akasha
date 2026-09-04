import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const caramelPecanTurtleCheesecake = {
  id: "01a06808-b765-7000-a172-538ca66dc45e",
  pageTypeSlug: "restaurant-menu-item",
  slug: "caramel-pecan-turtle-cheesecake",
  title: "Caramel Pecan Turtle Cheesecake",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 3750,
  unitSlug: "words",
  status: "completed",
  rank: "B",
} as const satisfies RestaurantMenuItem
