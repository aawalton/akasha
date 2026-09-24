import type { ScriptureCollection } from "akasha/alan/library/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const ether = {
  id: "01a06808-34d9-7023-b9ce-7e223063c9f9",
  type: "page-type/scripture-collection",
  slug: "ether",
  title: "Ether",
  translation: "book-of-mormon",
  partOfCollections: ["scripture-collection/book-of-mormon"],
  position: 14,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "ether",
} as const satisfies ScriptureCollection
