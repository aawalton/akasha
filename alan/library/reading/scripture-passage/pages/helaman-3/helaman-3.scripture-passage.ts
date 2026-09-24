import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const helaman3 = {
  id: "019f0977-275c-7fc2-bb3a-5f890ddb752b",
  type: "page-type/scripture-passage",
  slug: "helaman-3",
  title: "Helaman 3",
  partOfCollections: ["scripture-collection/helaman"],
  book: "Helaman",
  translation: "book-of-mormon",
  position: 160,
  passageText: "txt",
  status: "not-started",
  externalId: "helaman3",
} as const satisfies ScripturePassage
