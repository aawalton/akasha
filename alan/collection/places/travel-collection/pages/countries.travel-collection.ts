import type { TravelCollection } from "akasha/alan/collection/places/travel-collection/travel-collection.page-type.types.ts"

export const countries = {
  id: "01a06808-caa4-7001-9399-2dfd25f2f4af",
  type: "travel-collection",
  slug: "countries",
  title: "Countries",
  partOfCollections: ["travel-collection/travel"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies TravelCollection
