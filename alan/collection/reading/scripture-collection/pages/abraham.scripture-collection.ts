import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const abraham = {
  id: "01a06808-34d9-7015-ad36-5ca49321055c",
  type: "page-type/scripture-collection",
  slug: "abraham",
  title: "Abraham",
  partOfCollections: ["scripture-collection/pearl-of-great-price"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "abraham",
} as const satisfies ScriptureCollection
