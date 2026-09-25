import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const helaman12 = {
  id: "019f0977-2e9e-7b5d-837a-26353ca45394",
  type: "page-type/scripture-passage",
  slug: "helaman-12",
  title: "Helaman 12",
  partOfCollections: ["scripture-collection/helaman"],
  translation: "book-of-mormon",
  position: 169,
  passageText: "txt",
  status: "not-started",
  externalId: "helaman12",
} as const satisfies ScripturePassage
