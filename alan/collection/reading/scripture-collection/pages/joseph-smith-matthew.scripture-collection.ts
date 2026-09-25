import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const josephSmithMatthew = {
  id: "01a06808-34da-700c-b0da-15810660bbe8",
  type: "page-type/scripture-collection",
  slug: "joseph-smith-matthew",
  title: "Joseph Smith--Matthew",
  partOfCollections: ["scripture-collection/pearl-of-great-price"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "josephsmithmatthew",
} as const satisfies ScriptureCollection
