import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const lowLiciousCheesecake = {
  id: "01a06808-b765-7010-9cd5-2c633094a633",
  pageTypeSlug: "restaurant-menu-item",
  slug: "low-licious-cheesecake",
  title: "Low-Licious Cheesecake",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
