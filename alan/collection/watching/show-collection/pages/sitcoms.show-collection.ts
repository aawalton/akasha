import type { ShowCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.types.ts"

export const sitcoms = {
  id: "01a06808-6a77-700f-a93d-6b21007f60d5",
  type: "page-type/show-collection",
  slug: "sitcoms",
  title: "Sitcoms",
  partOfCollections: ["show-collection/shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
