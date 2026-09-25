import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const acts = {
  id: "01a06808-34d9-7016-b321-4bdc1ef9b541",
  type: "page-type/scripture-collection",
  slug: "acts",
  title: "Acts",
  partOfCollections: ["scripture-collection/new-testament"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "acts",
} as const satisfies ScriptureCollection
