import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const helaman4 = {
  id: "019f0977-282a-7605-8254-76e0ea5e500b",
  type: "page-type/scripture-passage",
  slug: "helaman-4",
  title: "Helaman 4",
  partOfCollections: ["scripture-collection/helaman"],
  translation: "book-of-mormon",
  position: 161,
  passageText: "txt",
  status: "not-started",
  externalId: "helaman4",
} as const satisfies ScripturePassage
