import type { ScriptureCollection } from "akasha/alan/library/reading/scripture-collections/scripture-collection.page-type.types.ts"

export const wordsOfMormon = {
  id: "01a06808-34da-702f-82f9-dc2503bb8e4e",
  type: "scripture-collection",
  slug: "words-of-mormon",
  title: "Words of Mormon",
  partOfCollections: ["book-of-mormon"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "wordsofmormon",
} as const satisfies ScriptureCollection
