import type { ScriptureCollection } from "akasha/alan/library/reading/scripture-collections/scripture-collection.page-type.types.ts"

export const scriptureCollection3Nephi = {
  id: "01a06808-34d9-7013-bdc6-cddeae67f2df",
  type: "scripture-collection",
  slug: "scripture-collection-3-nephi",
  title: "3 Nephi",
  partOfCollections: ["book-of-mormon"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "3nephi",
} as const satisfies ScriptureCollection
