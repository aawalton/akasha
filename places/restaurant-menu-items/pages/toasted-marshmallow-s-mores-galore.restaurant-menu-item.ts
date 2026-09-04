import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.ts"

export const toastedMarshmallowSMoresGalore = {
  id: "01a06808-b765-701c-943d-49faddaaa260",
  pageTypeSlug: "restaurant-menu-item",
  slug: "toasted-marshmallow-s-mores-galore",
  title: "Toasted Marshmallow S'mores Galore",
  partOfSlugs: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
