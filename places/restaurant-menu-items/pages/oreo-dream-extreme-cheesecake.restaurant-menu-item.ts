import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.types.ts"

export const oreoDreamExtremeCheesecake = {
  id: "01a06808-b765-7013-9013-b28eafa2a4f5",
  pageTypeSlug: "restaurant-menu-item",
  type: "restaurant-menu-item",
  slug: "oreo-dream-extreme-cheesecake",
  title: "Oreo Dream Extreme Cheesecake",
  partOfCollections: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
