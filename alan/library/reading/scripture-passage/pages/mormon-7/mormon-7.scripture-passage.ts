import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const mormon7 = {
  id: "019f0977-5007-7946-b62d-f04295df1498",
  type: "page-type/scripture-passage",
  slug: "mormon-7",
  title: "Mormon 7",
  partOfCollections: ["scripture-collection/mormon"],
  translation: "book-of-mormon",
  position: 211,
  passageText: "txt",
  status: "not-started",
  externalId: "mormon7",
} as const satisfies ScripturePassage
