import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const mosiah11 = {
  id: "019f0976-e5d0-7e6f-9497-55065f43449d",
  type: "page-type/scripture-passage",
  slug: "mosiah-11",
  title: "Mosiah 11",
  partOfCollections: ["scripture-collection/mosiah"],
  translation: "book-of-mormon",
  position: 76,
  passageText: "txt",
  unit: "unit/words",
  status: "not-started",
  externalId: "mosiah11",
} as const satisfies ScripturePassage
