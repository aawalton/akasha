import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const romans1 = {
  id: "01a06804-11b1-7024-9014-71874cd5afe5",
  type: "page-type/scripture-passage",
  slug: "romans-1",
  title: "Romans 1",
  partOfCollections: ["scripture-collection/romans"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "romans1",
} as const satisfies ScripturePassage
