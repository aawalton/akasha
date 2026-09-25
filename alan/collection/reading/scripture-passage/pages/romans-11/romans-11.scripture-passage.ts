import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const romans11 = {
  id: "01a06804-11b1-7026-ae46-ff07a44d53d4",
  type: "page-type/scripture-passage",
  slug: "romans-11",
  title: "Romans 11",
  partOfCollections: ["scripture-collection/romans"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "romans11",
} as const satisfies ScripturePassage
