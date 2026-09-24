import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const john11 = {
  id: "01a06804-11ae-7064-a97d-8e751b5660ac",
  type: "page-type/scripture-passage",
  slug: "john-11",
  title: "John 11",
  partOfCollections: ["scripture-collection/john"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "john11",
} as const satisfies ScripturePassage
