import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const mosiah2 = {
  id: "019f0976-df04-7857-bfbf-bc6e39a8101e",
  type: "page-type/scripture-passage",
  slug: "mosiah-2",
  title: "Mosiah 2",
  partOfCollections: ["scripture-collection/mosiah"],
  book: "Mosiah",
  translation: "book-of-mormon",
  position: 67,
  passageText: "txt",
  unit: "unit/words",
  status: "not-started",
  externalId: "mosiah2",
} as const satisfies ScripturePassage
