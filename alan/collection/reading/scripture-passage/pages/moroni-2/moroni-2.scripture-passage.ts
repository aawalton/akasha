import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const moroni2 = {
  id: "019f0977-5f23-73b4-8054-6670500d3770",
  type: "page-type/scripture-passage",
  slug: "moroni-2",
  title: "Moroni 2",
  partOfCollections: ["scripture-collection/moroni"],
  translation: "book-of-mormon",
  position: 230,
  passageText: "txt",
  status: "not-started",
  externalId: "moroni2",
} as const satisfies ScripturePassage
