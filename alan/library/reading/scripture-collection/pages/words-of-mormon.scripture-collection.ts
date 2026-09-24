import type { ScriptureCollection } from "akasha/alan/library/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const wordsOfMormon = {
  id: "01a06808-34da-702f-82f9-dc2503bb8e4e",
  type: "page-type/scripture-collection",
  slug: "words-of-mormon",
  title: "Words of Mormon",
  translation: "book-of-mormon",
  partOfCollections: ["scripture-collection/book-of-mormon"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "wordsofmormon",
} as const satisfies ScriptureCollection
