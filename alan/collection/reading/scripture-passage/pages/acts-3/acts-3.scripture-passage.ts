import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const acts3 = {
  id: "01a06804-11ab-700b-95c2-14860043b80d",
  type: "page-type/scripture-passage",
  slug: "acts-3",
  title: "Acts 3",
  partOfCollections: ["scripture-collection/acts"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "acts3",
} as const satisfies ScripturePassage
