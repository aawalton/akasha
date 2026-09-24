import type { ScriptureCollection } from "akasha/alan/library/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const jacob = {
  id: "01a06808-34da-7003-90a2-16493eee971d",
  type: "page-type/scripture-collection",
  slug: "jacob",
  title: "Jacob",
  translation: "book-of-mormon",
  partOfCollections: ["scripture-collection/book-of-mormon"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "jacob",
} as const satisfies ScriptureCollection
