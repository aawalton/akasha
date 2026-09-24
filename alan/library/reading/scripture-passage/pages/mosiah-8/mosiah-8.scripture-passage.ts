import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const mosiah8 = {
  id: "019f0976-e3a6-7dc1-a56b-7054f5e3b091",
  type: "page-type/scripture-passage",
  slug: "mosiah-8",
  title: "Mosiah 8",
  partOfCollections: ["scripture-collection/mosiah"],
  book: "Mosiah",
  translation: "book-of-mormon",
  position: 73,
  passageText: "txt",
  unit: "unit/words",
  status: "not-started",
  externalId: "mosiah8",
} as const satisfies ScripturePassage
