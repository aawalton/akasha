import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const peachPerfectWithRaspberryDrizzle = {
  id: "01a06808-b765-7015-a864-6e69a4972767",
  pageTypeSlug: "restaurant-menu-item",
  slug: "peach-perfect-with-raspberry-drizzle",
  title: "Peach Perfect with Raspberry Drizzle",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
