import type { TravelCollection } from "akasha/alan/collection/place/travel-collection/travel-collection.page-type.types.ts"

export const smithsonianMuseums = {
  id: "01a06808-caa5-7002-a11e-f306380e4ad5",
  type: "page-type/travel-collection",
  slug: "smithsonian-museums",
  title: "Smithsonian Museums",
  partOfCollections: ["travel-collection/travel"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies TravelCollection
