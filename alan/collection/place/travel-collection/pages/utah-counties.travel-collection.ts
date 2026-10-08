import type { TravelCollection } from "akasha/alan/collection/place/travel-collection/travel-collection.page-type.types.ts"

export const utahCounties = {
  id: "01a06808-caa5-7006-b6fc-2b25ff9a71ce",
  type: "page-type/travel-collection",
  slug: "utah-counties",
  title: "Utah Counties",
  partOfCollections: ["travel-collection/travel"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:10:01.765Z",
  updatedAt: "2026-09-15T16:32:11.000Z",
} as const satisfies TravelCollection
