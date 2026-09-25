import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const daniel7 = {
  id: "01a06804-11ab-7029-bdaa-9a769c6d2df9",
  type: "page-type/scripture-passage",
  slug: "daniel-7",
  title: "Daniel 7",
  partOfCollections: ["scripture-collection/daniel"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "daniel7",
} as const satisfies ScripturePassage
