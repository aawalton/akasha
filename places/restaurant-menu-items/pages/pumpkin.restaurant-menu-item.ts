import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const pumpkin = {
  id: "01a06808-b765-7017-a082-3d091e8db5d8",
  pageTypeSlug: "restaurant-menu-item",
  slug: "pumpkin",
  title: "Pumpkin",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
