import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const cinnabonCinnamonSwirlCheesecake = {
  id: "01a06808-b765-7005-921a-12528c5c0388",
  pageTypeSlug: "restaurant-menu-item",
  slug: "cinnabon-cinnamon-swirl-cheesecake",
  title: "Cinnabon Cinnamon Swirl Cheesecake",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
