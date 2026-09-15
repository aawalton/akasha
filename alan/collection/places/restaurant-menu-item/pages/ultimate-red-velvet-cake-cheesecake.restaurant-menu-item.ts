import type { RestaurantMenuItem } from "akasha/alan/collection/places/restaurant-menu-item/restaurant-menu-item.page-type.types.ts"

export const ultimateRedVelvetCakeCheesecake = {
  id: "01a06808-b765-701e-8ba0-a240705a6f97",
  type: "restaurant-menu-item",
  slug: "ultimate-red-velvet-cake-cheesecake",
  title: "Ultimate Red Velvet Cake Cheesecake",
  partOfCollections: ["restaurant-collection/cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
