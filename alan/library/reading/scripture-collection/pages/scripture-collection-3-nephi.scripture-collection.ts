import type { ScriptureCollection } from "akasha/alan/library/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const scriptureCollection3Nephi = {
  id: "01a06808-34d9-7013-bdc6-cddeae67f2df",
  type: "page-type/scripture-collection",
  slug: "scripture-collection-3-nephi",
  title: "3 Nephi",
  translation: "book-of-mormon",
  partOfCollections: ["scripture-collection/book-of-mormon"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "3nephi",
} as const satisfies ScriptureCollection
