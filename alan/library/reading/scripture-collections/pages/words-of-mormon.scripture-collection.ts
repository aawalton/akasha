import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const wordsOfMormon = {
  id: "01a06808-34da-702f-82f9-dc2503bb8e4e",
  pageTypeSlug: "scripture-collection",
  slug: "words-of-mormon",
  title: "Words of Mormon",
  partOfSlugs: ["book-of-mormon"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "wordsofmormon",
} as const satisfies ScriptureCollection
