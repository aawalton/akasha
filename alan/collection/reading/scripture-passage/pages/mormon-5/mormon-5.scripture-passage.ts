import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const mormon5 = {
  id: "019f0977-4e6d-7512-ac79-7370b31655ed",
  type: "page-type/scripture-passage",
  slug: "mormon-5",
  title: "Mormon 5",
  partOfCollections: ["scripture-collection/mormon"],
  translation: "book-of-mormon",
  position: 209,
  passageText: "txt",
  status: "not-started",
  externalId: "mormon5",
} as const satisfies ScripturePassage
