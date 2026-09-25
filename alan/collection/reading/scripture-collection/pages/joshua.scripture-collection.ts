import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const joshua = {
  id: "01a06808-34da-700d-a0ee-8f3f8962418b",
  type: "page-type/scripture-collection",
  slug: "joshua",
  title: "Joshua",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "joshua",
} as const satisfies ScriptureCollection
