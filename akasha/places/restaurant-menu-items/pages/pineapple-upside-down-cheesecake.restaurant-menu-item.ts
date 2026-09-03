import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const pineappleUpsideDownCheesecake = {
  id: "01a06808-b765-7016-a8cc-524fb2cb710f",
  pageTypeSlug: "restaurant-menu-item",
  slug: "pineapple-upside-down-cheesecake",
  title: "Pineapple Upside-Down Cheesecake",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
