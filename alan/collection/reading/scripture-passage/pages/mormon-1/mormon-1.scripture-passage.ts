import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const mormon1 = {
  id: "019f0977-4ae3-786e-a0e2-ca9784a8d556",
  type: "page-type/scripture-passage",
  slug: "mormon-1",
  title: "Mormon 1",
  partOfCollections: ["scripture-collection/mormon"],
  translation: "book-of-mormon",
  position: 205,
  passageText: "txt",
  status: "not-started",
  externalId: "mormon1",
  createdAt: "2026-06-27T14:24:00.739Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies ScripturePassage
