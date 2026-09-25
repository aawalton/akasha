import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const mosiah14 = {
  id: "019f0976-e81c-7cc3-bc6c-0d6a8a0db4b9",
  type: "page-type/scripture-passage",
  slug: "mosiah-14",
  title: "Mosiah 14",
  partOfCollections: ["scripture-collection/mosiah"],
  translation: "book-of-mormon",
  position: 79,
  passageText: "txt",
  unit: "unit/words",
  status: "not-started",
  externalId: "mosiah14",
} as const satisfies ScripturePassage
