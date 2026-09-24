import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const helaman11 = {
  id: "019f0977-2dd4-7c86-992e-9fdd1f08288c",
  type: "page-type/scripture-passage",
  slug: "helaman-11",
  title: "Helaman 11",
  partOfCollections: ["scripture-collection/helaman"],
  translation: "book-of-mormon",
  position: 168,
  passageText: "txt",
  status: "not-started",
  externalId: "helaman11",
} as const satisfies ScripturePassage
