import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const scriptureCollection2Nephi = {
  id: "01a06808-34d9-700d-a10b-f926227fb845",
  type: "page-type/scripture-collection",
  slug: "scripture-collection-2-nephi",
  title: "2 Nephi",
  translation: "book-of-mormon",
  partOfCollections: ["scripture-collection/book-of-mormon"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "2nephi",
} as const satisfies ScriptureCollection
