import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

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
  createdAt: "2026-09-03T16:09:23.418Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies ScriptureCollection
