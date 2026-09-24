import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const moroni1 = {
  id: "019f0977-5e64-7de3-8eaf-89e0363d7064",
  type: "page-type/scripture-passage",
  slug: "moroni-1",
  title: "Moroni 1",
  partOfCollections: ["scripture-collection/moroni"],
  translation: "book-of-mormon",
  position: 229,
  passageText: "txt",
  unit: "unit/words",
  status: "not-started",
  externalId: "moroni1",
} as const satisfies ScripturePassage
