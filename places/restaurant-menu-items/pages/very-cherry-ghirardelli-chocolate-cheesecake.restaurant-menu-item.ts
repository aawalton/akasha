import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const veryCherryGhirardelliChocolateCheesecake = {
  id: "01a06808-b765-7020-9238-02f569e02098",
  pageTypeSlug: "restaurant-menu-item",
  slug: "very-cherry-ghirardelli-chocolate-cheesecake",
  title: "Very Cherry Ghirardelli Chocolate Cheesecake",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
