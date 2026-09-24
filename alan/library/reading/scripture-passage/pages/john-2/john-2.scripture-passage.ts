import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const john2 = {
  id: "01a06804-11ae-706d-842c-6f6faf0afd4b",
  type: "page-type/scripture-passage",
  slug: "john-2",
  title: "John 2",
  partOfCollections: ["scripture-collection/john"],
  book: "John",
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "john2",
} as const satisfies ScripturePassage
