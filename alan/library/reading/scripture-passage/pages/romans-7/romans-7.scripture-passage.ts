import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const romans7 = {
  id: "01a06804-11b1-7031-a9d6-037a9f5684b0",
  type: "page-type/scripture-passage",
  slug: "romans-7",
  title: "Romans 7",
  partOfCollections: ["scripture-collection/romans"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "romans7",
} as const satisfies ScripturePassage
