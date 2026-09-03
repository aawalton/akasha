import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const ultimateRedVelvetCakeCheesecake = {
  id: "01a06808-b765-701e-8ba0-a240705a6f97",
  pageTypeSlug: "restaurant-menu-item",
  slug: "ultimate-red-velvet-cake-cheesecake",
  title: "Ultimate Red Velvet Cake Cheesecake",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
