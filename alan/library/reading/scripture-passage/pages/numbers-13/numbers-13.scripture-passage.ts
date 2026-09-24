import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const numbers13 = {
  id: "01a06804-11af-7067-8d99-f9103508e8ae",
  type: "page-type/scripture-passage",
  slug: "numbers-13",
  title: "Numbers 13",
  partOfCollections: ["scripture-collection/numbers"],
  book: "Numbers",
  position: 13,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "numbers13",
} as const satisfies ScripturePassage
