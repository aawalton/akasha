import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const isaiah = {
  id: "01a06808-34da-7002-91e7-4f028553eed1",
  type: "page-type/scripture-collection",
  slug: "isaiah",
  title: "Isaiah",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 23,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "isaiah",
} as const satisfies ScriptureCollection
