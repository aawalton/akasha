import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const john14 = {
  id: "01a06804-11ae-7067-bcad-27f890958812",
  type: "page-type/scripture-passage",
  slug: "john-14",
  title: "John 14",
  partOfCollections: ["scripture-collection/john"],
  book: "John",
  position: 14,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "john14",
} as const satisfies ScripturePassage
