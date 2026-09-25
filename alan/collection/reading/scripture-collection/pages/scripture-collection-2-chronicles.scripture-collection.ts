import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const scriptureCollection2Chronicles = {
  id: "01a06808-34d9-7009-8c1e-d6e1a8813265",
  type: "page-type/scripture-collection",
  slug: "scripture-collection-2-chronicles",
  title: "2 Chronicles",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 14,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "2chronicles",
} as const satisfies ScriptureCollection
