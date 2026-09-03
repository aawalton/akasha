import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const original = {
  id: "01a06808-b765-7014-ac39-d0e8197d576e",
  pageTypeSlug: "restaurant-menu-item",
  slug: "original",
  title: "Original",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
