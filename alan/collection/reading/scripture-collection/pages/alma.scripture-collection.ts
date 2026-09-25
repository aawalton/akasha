import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const alma = {
  id: "01a06808-34d9-7017-898d-9e53d4485c8b",
  type: "page-type/scripture-collection",
  slug: "alma",
  title: "Alma",
  translation: "book-of-mormon",
  partOfCollections: ["scripture-collection/book-of-mormon"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "alma",
} as const satisfies ScriptureCollection
