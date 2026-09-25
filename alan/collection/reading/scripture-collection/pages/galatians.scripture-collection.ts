import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const galatians = {
  id: "01a06808-34d9-7027-bc1d-b90e2b884557",
  type: "page-type/scripture-collection",
  slug: "galatians",
  title: "Galatians",
  partOfCollections: ["scripture-collection/new-testament"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "galatians",
} as const satisfies ScriptureCollection
