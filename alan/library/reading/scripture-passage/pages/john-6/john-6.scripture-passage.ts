import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const john6 = {
  id: "01a06804-11ae-7073-a74b-97d8f07eb4b8",
  type: "page-type/scripture-passage",
  slug: "john-6",
  title: "John 6",
  partOfCollections: ["scripture-collection/john"],
  book: "John",
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "john6",
} as const satisfies ScripturePassage
