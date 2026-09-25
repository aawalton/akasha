import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const alma1 = {
  id: "019f0976-f478-7f5d-8f0d-2dbfb674c77c",
  type: "page-type/scripture-passage",
  slug: "alma-1",
  title: "Alma 1",
  partOfCollections: ["scripture-collection/alma"],
  translation: "book-of-mormon",
  position: 95,
  passageText: "txt",
  status: "not-started",
  externalId: "alma1",
} as const satisfies ScripturePassage
