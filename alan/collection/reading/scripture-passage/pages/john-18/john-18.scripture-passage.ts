import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const john18 = {
  id: "01a06804-11ae-706b-a3aa-c7ea382859df",
  type: "page-type/scripture-passage",
  slug: "john-18",
  title: "John 18",
  partOfCollections: ["scripture-collection/john"],
  position: 18,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "john18",
} as const satisfies ScripturePassage
