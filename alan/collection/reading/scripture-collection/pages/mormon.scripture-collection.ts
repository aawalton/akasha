import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const mormon = {
  id: "01a06808-34da-7017-a74e-06f5c62d863e",
  type: "page-type/scripture-collection",
  slug: "mormon",
  title: "Mormon",
  translation: "book-of-mormon",
  partOfCollections: ["scripture-collection/book-of-mormon"],
  position: 13,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "mormon",
} as const satisfies ScriptureCollection
