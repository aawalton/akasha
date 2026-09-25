import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const romans10 = {
  id: "01a06804-11b1-7025-8b6a-e73e106babba",
  type: "page-type/scripture-passage",
  slug: "romans-10",
  title: "Romans 10",
  partOfCollections: ["scripture-collection/romans"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "romans10",
} as const satisfies ScripturePassage
