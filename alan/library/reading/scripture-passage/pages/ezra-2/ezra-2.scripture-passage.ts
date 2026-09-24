import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const ezra2 = {
  id: "01a06804-11ad-7002-b500-8a5f98acdbcb",
  type: "page-type/scripture-passage",
  slug: "ezra-2",
  title: "Ezra 2",
  partOfCollections: ["scripture-collection/ezra"],
  book: "Ezra",
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "ezra2",
} as const satisfies ScripturePassage
