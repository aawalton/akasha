import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const celebrationCheesecake = {
  id: "01a06808-b765-7001-804a-798f881c42f6",
  pageTypeSlug: "restaurant-menu-item",
  slug: "celebration-cheesecake",
  title: "Celebration Cheesecake",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
