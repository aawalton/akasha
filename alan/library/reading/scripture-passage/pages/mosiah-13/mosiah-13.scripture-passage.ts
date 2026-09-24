import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const mosiah13 = {
  id: "019f0976-e75e-77ae-afdd-eed66d171fe4",
  type: "page-type/scripture-passage",
  slug: "mosiah-13",
  title: "Mosiah 13",
  partOfCollections: ["scripture-collection/mosiah"],
  book: "Mosiah",
  translation: "book-of-mormon",
  position: 78,
  passageText: "txt",
  unit: "unit/words",
  status: "not-started",
  externalId: "mosiah13",
} as const satisfies ScripturePassage
