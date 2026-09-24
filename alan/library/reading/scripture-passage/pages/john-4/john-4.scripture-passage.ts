import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const john4 = {
  id: "01a06804-11ae-7071-a815-56321911990f",
  type: "page-type/scripture-passage",
  slug: "john-4",
  title: "John 4",
  partOfCollections: ["scripture-collection/john"],
  book: "John",
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "john4",
} as const satisfies ScripturePassage
