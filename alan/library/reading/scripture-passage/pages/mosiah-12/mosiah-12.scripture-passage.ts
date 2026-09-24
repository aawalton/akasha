import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const mosiah12 = {
  id: "019f0976-e692-79da-aa7f-1d55482c6dab",
  type: "page-type/scripture-passage",
  slug: "mosiah-12",
  title: "Mosiah 12",
  partOfCollections: ["scripture-collection/mosiah"],
  book: "Mosiah",
  translation: "book-of-mormon",
  position: 77,
  passageText: "txt",
  unit: "unit/words",
  status: "not-started",
  externalId: "mosiah12",
} as const satisfies ScripturePassage
