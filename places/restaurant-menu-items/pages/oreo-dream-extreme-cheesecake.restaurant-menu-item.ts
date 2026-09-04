import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const oreoDreamExtremeCheesecake = {
  id: "01a06808-b765-7013-9013-b28eafa2a4f5",
  pageTypeSlug: "restaurant-menu-item",
  slug: "oreo-dream-extreme-cheesecake",
  title: "Oreo Dream Extreme Cheesecake",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
