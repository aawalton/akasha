import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const mosiah4 = {
  id: "019f0976-e090-70aa-aed5-d5cb5d86ab3d",
  type: "page-type/scripture-passage",
  slug: "mosiah-4",
  title: "Mosiah 4",
  partOfCollections: ["scripture-collection/mosiah"],
  translation: "book-of-mormon",
  position: 69,
  passageText: "txt",
  unit: "unit/words",
  status: "not-started",
  externalId: "mosiah4",
} as const satisfies ScripturePassage
