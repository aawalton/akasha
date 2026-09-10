import type { RestaurantMenuItem } from "../restaurant-menu-item.page-type.types.ts"

export const toastedMarshmallowSMoresGalore = {
  id: "01a06808-b765-701c-943d-49faddaaa260",
  pageTypeSlug: "restaurant-menu-item",
  type: "restaurant-menu-item",
  slug: "toasted-marshmallow-s-mores-galore",
  title: "Toasted Marshmallow S'mores Galore",
  partOfCollections: ["cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
