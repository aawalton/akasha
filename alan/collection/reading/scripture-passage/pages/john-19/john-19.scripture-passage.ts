import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const john19 = {
  id: "01a06804-11ae-706c-bdd8-d5f7b08cdb17",
  type: "page-type/scripture-passage",
  slug: "john-19",
  title: "John 19",
  partOfCollections: ["scripture-collection/john"],
  position: 19,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "john19",
} as const satisfies ScripturePassage
