import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const daniel11 = {
  id: "01a06804-11ab-7022-9801-e6838de282b5",
  type: "page-type/scripture-passage",
  slug: "daniel-11",
  title: "Daniel 11",
  partOfCollections: ["scripture-collection/daniel"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "daniel11",
} as const satisfies ScripturePassage
