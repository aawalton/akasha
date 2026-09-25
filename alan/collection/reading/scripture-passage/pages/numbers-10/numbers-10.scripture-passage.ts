import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const numbers10 = {
  id: "01a06804-11af-7064-b9de-4f5d62212677",
  type: "page-type/scripture-passage",
  slug: "numbers-10",
  title: "Numbers 10",
  partOfCollections: ["scripture-collection/numbers"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "numbers10",
} as const satisfies ScripturePassage
