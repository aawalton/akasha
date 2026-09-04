import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const chocolateMousseCheesecake = {
  id: "01a06808-b765-7003-b627-a6b20d732017",
  pageTypeSlug: "restaurant-menu-item",
  slug: "chocolate-mousse-cheesecake",
  title: "Chocolate Mousse Cheesecake",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
