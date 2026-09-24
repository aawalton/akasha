import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const helaman1 = {
  id: "019f0977-25d5-770c-9071-d5ebfa750fac",
  type: "page-type/scripture-passage",
  slug: "helaman-1",
  title: "Helaman 1",
  partOfCollections: ["scripture-collection/helaman"],
  translation: "book-of-mormon",
  position: 158,
  passageText: "txt",
  status: "not-started",
  externalId: "helaman1",
} as const satisfies ScripturePassage
