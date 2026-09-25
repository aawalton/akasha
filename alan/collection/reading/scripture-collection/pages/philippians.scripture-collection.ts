import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const philippians = {
  id: "01a06808-34da-7025-b8ef-3e8523900dfe",
  type: "page-type/scripture-collection",
  slug: "philippians",
  title: "Philippians",
  partOfCollections: ["scripture-collection/new-testament"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "philippians",
} as const satisfies ScriptureCollection
