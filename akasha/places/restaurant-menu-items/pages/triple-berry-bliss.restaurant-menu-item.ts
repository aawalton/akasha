import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const tripleBerryBliss = {
  id: "01a06808-b765-701d-bed3-83678207ee6c",
  pageTypeSlug: "restaurant-menu-item",
  slug: "triple-berry-bliss",
  title: "Triple Berry Bliss",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
