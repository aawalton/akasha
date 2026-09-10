import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.types.ts"

export const freshBananaCreamCheesecake = {
  id: "01a06808-b765-7009-a5a9-9da145ccf083",
  pageTypeSlug: "restaurant-menu-item",
  type: "restaurant-menu-item",
  slug: "fresh-banana-cream-cheesecake",
  title: "Fresh Banana Cream Cheesecake",
  partOfCollections: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
