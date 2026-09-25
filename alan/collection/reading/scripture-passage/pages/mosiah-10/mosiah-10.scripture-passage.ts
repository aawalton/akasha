import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const mosiah10 = {
  id: "019f0976-e519-71cc-9f4a-83604ce88c7c",
  type: "page-type/scripture-passage",
  slug: "mosiah-10",
  title: "Mosiah 10",
  partOfCollections: ["scripture-collection/mosiah"],
  translation: "book-of-mormon",
  position: 75,
  passageText: "txt",
  unit: "unit/words",
  status: "not-started",
  externalId: "mosiah10",
} as const satisfies ScripturePassage
