import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const enos1 = {
  id: "019f0976-db3c-79aa-9232-5bd07d0d9d72",
  type: "page-type/scripture-passage",
  slug: "enos-1",
  title: "Enos 1",
  partOfCollections: ["scripture-collection/enos"],
  translation: "book-of-mormon",
  position: 62,
  passageText: "txt",
  status: "not-started",
  externalId: "enos1",
} as const satisfies ScripturePassage
