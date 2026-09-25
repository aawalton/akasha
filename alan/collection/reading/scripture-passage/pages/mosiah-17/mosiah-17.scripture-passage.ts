import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const mosiah17 = {
  id: "019f0976-ea6a-75c6-a8c9-9470d709b0a3",
  type: "page-type/scripture-passage",
  slug: "mosiah-17",
  title: "Mosiah 17",
  partOfCollections: ["scripture-collection/mosiah"],
  translation: "book-of-mormon",
  position: 82,
  passageText: "txt",
  unit: "unit/words",
  status: "not-started",
  externalId: "mosiah17",
} as const satisfies ScripturePassage
