import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const numbers1 = {
  id: "01a06804-11af-7063-85fb-5f4dbad93556",
  type: "page-type/scripture-passage",
  slug: "numbers-1",
  title: "Numbers 1",
  partOfCollections: ["scripture-collection/numbers"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "numbers1",
} as const satisfies ScripturePassage
