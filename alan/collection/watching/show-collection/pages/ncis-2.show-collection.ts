import type { ShowCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.types.ts"

export const ncis2 = {
  id: "01a06808-6a77-700b-a2e7-4ee5f7597a43",
  type: "page-type/show-collection",
  slug: "ncis-2",
  title: "NCIS",
  partOfCollections: ["show-collection/crime-investigation-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
} as const satisfies ShowCollection
