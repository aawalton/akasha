import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const lowLiciousCheesecakeWithStrawberries = {
  id: "01a06808-b765-7011-8fc7-dd3cb2f94fbb",
  pageTypeSlug: "restaurant-menu-item",
  slug: "low-licious-cheesecake-with-strawberries",
  title: "Low-Licious Cheesecake with Strawberries",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
