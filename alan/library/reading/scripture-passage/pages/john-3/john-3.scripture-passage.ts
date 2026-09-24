import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const john3 = {
  id: "01a06804-11ae-7070-83a6-b09b489ce2a2",
  type: "page-type/scripture-passage",
  slug: "john-3",
  title: "John 3",
  partOfCollections: ["scripture-collection/john"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "john3",
} as const satisfies ScripturePassage
