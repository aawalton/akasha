import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const mosiah5 = {
  id: "019f0976-e152-754e-8389-a5f9dd095326",
  type: "page-type/scripture-passage",
  slug: "mosiah-5",
  title: "Mosiah 5",
  partOfCollections: ["scripture-collection/mosiah"],
  translation: "book-of-mormon",
  position: 70,
  passageText: "txt",
  unit: "unit/words",
  status: "not-started",
  externalId: "mosiah5",
} as const satisfies ScripturePassage
