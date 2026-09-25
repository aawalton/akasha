import type { ShowCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.types.ts"

export const speculativeAntholoagies = {
  id: "01a06808-6a77-7010-bb27-6c9f0e56be3f",
  type: "page-type/show-collection",
  slug: "speculative-antholoagies",
  title: "Speculative AntholoAgies",
  partOfCollections: ["show-collection/shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
