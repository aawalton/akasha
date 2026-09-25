import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const numbers5 = {
  id: "01a06804-11af-7082-ab22-280d92ed80e5",
  type: "page-type/scripture-passage",
  slug: "numbers-5",
  title: "Numbers 5",
  partOfCollections: ["scripture-collection/numbers"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "numbers5",
} as const satisfies ScripturePassage
