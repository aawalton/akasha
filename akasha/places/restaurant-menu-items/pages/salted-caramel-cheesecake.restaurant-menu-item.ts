import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const saltedCaramelCheesecake = {
  id: "01a06808-b765-701a-b9a1-8f997b9e7ad0",
  pageTypeSlug: "restaurant-menu-item",
  slug: "salted-caramel-cheesecake",
  title: "Salted Caramel Cheesecake",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
