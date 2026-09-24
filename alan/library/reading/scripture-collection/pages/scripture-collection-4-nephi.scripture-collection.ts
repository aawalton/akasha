import type { ScriptureCollection } from "akasha/alan/library/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const scriptureCollection4Nephi = {
  id: "01a06808-34d9-7014-b003-eecacccc511f",
  type: "page-type/scripture-collection",
  slug: "scripture-collection-4-nephi",
  title: "4 Nephi",
  translation: "book-of-mormon",
  partOfCollections: ["scripture-collection/book-of-mormon"],
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "4nephi",
} as const satisfies ScriptureCollection
