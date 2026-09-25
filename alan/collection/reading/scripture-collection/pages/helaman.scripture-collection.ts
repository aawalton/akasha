import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const helaman = {
  id: "01a06808-34da-7000-b029-3cb33ba310e4",
  type: "page-type/scripture-collection",
  slug: "helaman",
  title: "Helaman",
  translation: "book-of-mormon",
  partOfCollections: ["scripture-collection/book-of-mormon"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "helaman",
} as const satisfies ScriptureCollection
