import type { ScriptureCollection } from "akasha/alan/library/reading/scripture-collections/scripture-collection.page-type.types.ts"

export const jarom = {
  id: "01a06808-34da-7005-bc43-6f79900ed71f",
  type: "scripture-collection",
  slug: "jarom",
  title: "Jarom",
  partOfCollections: ["book-of-mormon"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "jarom",
} as const satisfies ScriptureCollection
