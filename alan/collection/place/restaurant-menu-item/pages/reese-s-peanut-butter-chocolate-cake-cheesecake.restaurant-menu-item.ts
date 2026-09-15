import type { RestaurantMenuItem } from "akasha/alan/collection/place/restaurant-menu-item/restaurant-menu-item.page-type.types.ts"

export const reeseSPeanutButterChocolateCakeCheesecake = {
  id: "01a06808-b765-7019-b1c2-938534b0a8d8",
  type: "page-type/restaurant-menu-item",
  slug: "reese-s-peanut-butter-chocolate-cake-cheesecake",
  title: "Reese's Peanut Butter Chocolate Cake Cheesecake",
  partOfCollections: ["restaurant-collection/cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
