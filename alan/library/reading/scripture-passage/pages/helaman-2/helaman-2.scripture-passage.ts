import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const helaman2 = {
  id: "019f0977-2685-7ea4-90ea-712b435bf21d",
  type: "page-type/scripture-passage",
  slug: "helaman-2",
  title: "Helaman 2",
  partOfCollections: ["scripture-collection/helaman"],
  book: "Helaman",
  translation: "book-of-mormon",
  position: 159,
  passageText: "txt",
  status: "not-started",
  externalId: "helaman2",
} as const satisfies ScripturePassage
