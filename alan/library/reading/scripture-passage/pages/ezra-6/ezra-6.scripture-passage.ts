import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const ezra6 = {
  id: "01a06804-11ad-7006-958f-5f1dc362309a",
  type: "page-type/scripture-passage",
  slug: "ezra-6",
  title: "Ezra 6",
  partOfCollections: ["scripture-collection/ezra"],
  book: "Ezra",
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "ezra6",
} as const satisfies ScripturePassage
