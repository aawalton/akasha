import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const john17 = {
  id: "01a06804-11ae-706a-bef8-9dfc7e006d87",
  type: "page-type/scripture-passage",
  slug: "john-17",
  title: "John 17",
  partOfCollections: ["scripture-collection/john"],
  position: 17,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "john17",
} as const satisfies ScripturePassage
