import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const mangoKeyLimeCheesecake = {
  id: "01a06808-b765-7012-9256-2a109dd2dd9a",
  pageTypeSlug: "restaurant-menu-item",
  slug: "mango-key-lime-cheesecake",
  title: "Mango Key Lime Cheesecake",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
