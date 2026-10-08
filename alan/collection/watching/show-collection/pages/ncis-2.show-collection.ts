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
  createdAt: "2026-09-03T16:09:37.143Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies ShowCollection
