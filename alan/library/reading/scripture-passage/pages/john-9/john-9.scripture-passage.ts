import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const john9 = {
  id: "01a06804-11ae-7076-940e-b157c3c63f11",
  type: "page-type/scripture-passage",
  slug: "john-9",
  title: "John 9",
  partOfCollections: ["scripture-collection/john"],
  book: "John",
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "john9",
} as const satisfies ScripturePassage
