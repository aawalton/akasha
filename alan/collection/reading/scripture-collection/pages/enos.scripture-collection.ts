import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const enos = {
  id: "01a06808-34d9-7020-a0bd-c5988ea9dd68",
  type: "page-type/scripture-collection",
  slug: "enos",
  title: "Enos",
  translation: "book-of-mormon",
  partOfCollections: ["scripture-collection/book-of-mormon"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "enos",
} as const satisfies ScriptureCollection
