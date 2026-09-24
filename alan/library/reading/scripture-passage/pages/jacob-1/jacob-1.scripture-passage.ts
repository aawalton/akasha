import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const jacob1 = {
  id: "019f0976-d5aa-75f0-885d-19eb968b10de",
  type: "page-type/scripture-passage",
  slug: "jacob-1",
  title: "Jacob 1",
  partOfCollections: ["scripture-collection/jacob"],
  book: "Jacob",
  translation: "book-of-mormon",
  position: 55,
  passageText: "txt",
  status: "not-started",
  externalId: "jacob1",
} as const satisfies ScripturePassage
