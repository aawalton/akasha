import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const mormon8 = {
  id: "019f0977-50d1-73b6-ada1-15543027e147",
  type: "page-type/scripture-passage",
  slug: "mormon-8",
  title: "Mormon 8",
  partOfCollections: ["scripture-collection/mormon"],
  translation: "book-of-mormon",
  position: 212,
  passageText: "txt",
  status: "not-started",
  externalId: "mormon8",
} as const satisfies ScripturePassage
