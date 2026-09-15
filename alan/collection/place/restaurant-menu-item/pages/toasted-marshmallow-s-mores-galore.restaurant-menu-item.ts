import type { RestaurantMenuItem } from "akasha/alan/collection/place/restaurant-menu-item/restaurant-menu-item.page-type.types.ts"

export const toastedMarshmallowSMoresGalore = {
  id: "01a06808-b765-701c-943d-49faddaaa260",
  type: "page-type/restaurant-menu-item",
  slug: "toasted-marshmallow-s-mores-galore",
  title: "Toasted Marshmallow S'mores Galore",
  partOfCollections: ["restaurant-collection/cheesecake-factory-cheescakes"],
  position: 0,
  ownLength: 3750,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies RestaurantMenuItem
