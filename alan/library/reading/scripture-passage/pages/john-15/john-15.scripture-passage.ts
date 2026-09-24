import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const john15 = {
  id: "01a06804-11ae-7068-b753-e7fcbb42a738",
  type: "page-type/scripture-passage",
  slug: "john-15",
  title: "John 15",
  partOfCollections: ["scripture-collection/john"],
  book: "John",
  position: 15,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "john15",
} as const satisfies ScripturePassage
