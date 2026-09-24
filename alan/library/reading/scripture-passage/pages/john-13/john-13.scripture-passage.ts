import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const john13 = {
  id: "01a06804-11ae-7066-87af-6828d00428fc",
  type: "page-type/scripture-passage",
  slug: "john-13",
  title: "John 13",
  partOfCollections: ["scripture-collection/john"],
  position: 13,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "john13",
} as const satisfies ScripturePassage
