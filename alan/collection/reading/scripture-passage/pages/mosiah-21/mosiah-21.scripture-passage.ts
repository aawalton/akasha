import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const mosiah21 = {
  id: "019f0976-ed87-767f-afd1-24705f803c12",
  type: "page-type/scripture-passage",
  slug: "mosiah-21",
  title: "Mosiah 21",
  partOfCollections: ["scripture-collection/mosiah"],
  translation: "book-of-mormon",
  position: 86,
  passageText: "txt",
  unit: "unit/words",
  status: "not-started",
  externalId: "mosiah21",
} as const satisfies ScripturePassage
