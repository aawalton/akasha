import type { TravelCollection } from "akasha/alan/collection/place/travel-collection/travel-collection.page-type.types.ts"

export const unescoWorldHeritageSites = {
  id: "01a06808-caa5-7004-8cf5-318dad8c2d54",
  type: "page-type/travel-collection",
  slug: "unesco-world-heritage-sites",
  title: "UNESCO World Heritage Sites",
  partOfCollections: ["travel-collection/travel"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies TravelCollection
