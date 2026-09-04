import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const freshStrawberry = {
  id: "01a06808-b765-700a-a265-97ad69b3d196",
  pageTypeSlug: "restaurant-menu-item",
  slug: "fresh-strawberry",
  title: "Fresh Strawberry",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "in-progress",
} as const satisfies RestaurantMenuItem
