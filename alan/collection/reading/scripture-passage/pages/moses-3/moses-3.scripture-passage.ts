import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const moses3 = {
  id: "01a06804-11af-704d-a037-bd6f116d40bb",
  type: "page-type/scripture-passage",
  slug: "moses-3",
  title: "Moses 3",
  partOfCollections: ["scripture-collection/moses"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "moses3",
} as const satisfies ScripturePassage
