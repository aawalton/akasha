import type { ShowCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.types.ts"

export const dungeonsAndDragonsShows = {
  id: "01a06808-6a77-7006-819d-378765a98da2",
  type: "page-type/show-collection",
  slug: "dungeons-and-dragons-shows",
  title: "Dungeons and Dragons Shows",
  partOfCollections: ["fandom/dungeons-and-dragons"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
