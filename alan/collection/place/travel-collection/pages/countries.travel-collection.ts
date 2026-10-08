import type { TravelCollection } from "akasha/alan/collection/place/travel-collection/travel-collection.page-type.types.ts"

export const countries = {
  id: "01a06808-caa4-7001-9399-2dfd25f2f4af",
  type: "page-type/travel-collection",
  slug: "countries",
  title: "Countries",
  partOfCollections: ["travel-collection/travel"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:10:01.764Z",
  updatedAt: "2026-09-15T16:32:11.000Z",
} as const satisfies TravelCollection
