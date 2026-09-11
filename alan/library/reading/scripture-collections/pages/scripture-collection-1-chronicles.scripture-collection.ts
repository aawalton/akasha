import type { ScriptureCollection } from "akasha/alan/library/reading/scripture-collections/scripture-collection.page-type.types.ts"

export const scriptureCollection1Chronicles = {
  id: "01a06808-34d9-7000-b2b3-6aca38dc87f3",
  type: "scripture-collection",
  slug: "scripture-collection-1-chronicles",
  title: "1 Chronicles",
  partOfCollections: ["old-testament"],
  position: 13,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "1chronicles",
} as const satisfies ScriptureCollection
