import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const scriptureCollection1Chronicles = {
  id: "01a06808-34d9-7000-b2b3-6aca38dc87f3",
  type: "page-type/scripture-collection",
  slug: "scripture-collection-1-chronicles",
  title: "1 Chronicles",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 13,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1chronicles",
} as const satisfies ScriptureCollection
