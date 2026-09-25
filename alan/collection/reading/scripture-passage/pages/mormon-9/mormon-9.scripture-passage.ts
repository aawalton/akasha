import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const mormon9 = {
  id: "019f0977-5197-737d-a555-2e7d0442212f",
  type: "page-type/scripture-passage",
  slug: "mormon-9",
  title: "Mormon 9",
  partOfCollections: ["scripture-collection/mormon"],
  translation: "book-of-mormon",
  position: 213,
  passageText: "txt",
  status: "not-started",
  externalId: "mormon9",
} as const satisfies ScripturePassage
