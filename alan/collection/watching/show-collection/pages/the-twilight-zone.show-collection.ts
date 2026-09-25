import type { ShowCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.types.ts"

export const theTwilightZone = {
  id: "01a06808-6a77-7014-962e-e0a278995da8",
  type: "page-type/show-collection",
  slug: "the-twilight-zone",
  title: "The Twilight Zone",
  partOfCollections: ["show-collection/speculative-antholoagies"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
} as const satisfies ShowCollection
