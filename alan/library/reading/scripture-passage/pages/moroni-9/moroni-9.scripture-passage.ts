import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const moroni9 = {
  id: "019f0977-64b2-7843-b9c9-5e69f7cc981d",
  type: "page-type/scripture-passage",
  slug: "moroni-9",
  title: "Moroni 9",
  partOfCollections: ["scripture-collection/moroni"],
  translation: "book-of-mormon",
  position: 237,
  passageText: "txt",
  status: "not-started",
  externalId: "moroni9",
} as const satisfies ScripturePassage
