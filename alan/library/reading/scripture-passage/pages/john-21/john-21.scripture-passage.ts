import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const john21 = {
  id: "01a06804-11ae-706f-bf78-b09838c4d8c6",
  type: "page-type/scripture-passage",
  slug: "john-21",
  title: "John 21",
  partOfCollections: ["scripture-collection/john"],
  book: "John",
  position: 21,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "john21",
} as const satisfies ScripturePassage
