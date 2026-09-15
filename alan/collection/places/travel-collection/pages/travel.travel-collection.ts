import type { TravelCollection } from "akasha/alan/collection/places/travel-collection/travel-collection.page-type.types.ts"

export const travel = {
  id: "01a06808-caa5-7003-9422-ffd1bdf740c4",
  type: "travel-collection",
  slug: "travel",
  title: "Travel",
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
} as const satisfies TravelCollection
