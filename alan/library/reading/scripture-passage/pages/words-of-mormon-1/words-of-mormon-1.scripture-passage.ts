import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const wordsOfMormon1 = {
  id: "019f0976-dd7d-7c13-9e20-bb87e934a79b",
  type: "page-type/scripture-passage",
  slug: "words-of-mormon-1",
  title: "Words of Mormon 1",
  partOfCollections: ["scripture-collection/words-of-mormon"],
  translation: "book-of-mormon",
  position: 65,
  passageText: "txt",
  status: "not-started",
  externalId: "wordsofmormon1",
} as const satisfies ScripturePassage
