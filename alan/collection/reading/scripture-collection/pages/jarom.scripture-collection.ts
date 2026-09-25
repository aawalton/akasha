import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const jarom = {
  id: "01a06808-34da-7005-bc43-6f79900ed71f",
  type: "page-type/scripture-collection",
  slug: "jarom",
  title: "Jarom",
  translation: "book-of-mormon",
  partOfCollections: ["scripture-collection/book-of-mormon"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "jarom",
} as const satisfies ScriptureCollection
