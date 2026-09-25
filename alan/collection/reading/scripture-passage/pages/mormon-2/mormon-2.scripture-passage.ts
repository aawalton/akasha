import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const mormon2 = {
  id: "019f0977-4ba2-742d-8ba1-b59b19903a92",
  type: "page-type/scripture-passage",
  slug: "mormon-2",
  title: "Mormon 2",
  partOfCollections: ["scripture-collection/mormon"],
  translation: "book-of-mormon",
  position: 206,
  passageText: "txt",
  status: "not-started",
  externalId: "mormon2",
} as const satisfies ScripturePassage
