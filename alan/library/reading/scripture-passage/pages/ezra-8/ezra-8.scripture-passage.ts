import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const ezra8 = {
  id: "01a06804-11ad-7008-9bb9-6904d7a2c318",
  type: "page-type/scripture-passage",
  slug: "ezra-8",
  title: "Ezra 8",
  partOfCollections: ["scripture-collection/ezra"],
  book: "Ezra",
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "ezra8",
} as const satisfies ScripturePassage
