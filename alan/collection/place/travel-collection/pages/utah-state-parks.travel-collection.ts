import type { TravelCollection } from "akasha/alan/collection/place/travel-collection/travel-collection.page-type.types.ts"

export const utahStateParks = {
  id: "01a06808-caa5-7007-bef8-db3dddd30f06",
  type: "page-type/travel-collection",
  slug: "utah-state-parks",
  title: "Utah State Parks",
  partOfCollections: ["travel-collection/travel"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:10:01.765Z",
  updatedAt: "2026-09-15T16:32:11.000Z",
} as const satisfies TravelCollection
