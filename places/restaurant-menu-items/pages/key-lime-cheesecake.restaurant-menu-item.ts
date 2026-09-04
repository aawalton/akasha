import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const keyLimeCheesecake = {
  id: "01a06808-b765-700d-a332-73b4f2813418",
  pageTypeSlug: "restaurant-menu-item",
  slug: "key-lime-cheesecake",
  title: "Key Lime Cheesecake",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
