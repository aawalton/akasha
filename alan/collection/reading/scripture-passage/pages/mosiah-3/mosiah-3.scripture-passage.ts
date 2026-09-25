import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const mosiah3 = {
  id: "019f0976-dfc4-7f2b-937e-f333e852fc36",
  type: "page-type/scripture-passage",
  slug: "mosiah-3",
  title: "Mosiah 3",
  partOfCollections: ["scripture-collection/mosiah"],
  translation: "book-of-mormon",
  position: 68,
  passageText: "txt",
  unit: "unit/words",
  status: "not-started",
  externalId: "mosiah3",
} as const satisfies ScripturePassage
