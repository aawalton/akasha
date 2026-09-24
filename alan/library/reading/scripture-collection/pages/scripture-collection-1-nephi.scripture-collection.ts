import type { ScriptureCollection } from "akasha/alan/library/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const scriptureCollection1Nephi = {
  id: "01a06808-34d9-7004-a2c3-cebf1a99f1cd",
  type: "page-type/scripture-collection",
  slug: "scripture-collection-1-nephi",
  title: "1 Nephi",
  translation: "book-of-mormon",
  partOfCollections: ["scripture-collection/book-of-mormon"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1nephi",
} as const satisfies ScriptureCollection
