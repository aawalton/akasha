import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const abraham1 = {
  id: "01a06804-11aa-703e-8dfa-d561c07ade2f",
  type: "page-type/scripture-passage",
  slug: "abraham-1",
  title: "Abraham 1",
  partOfCollections: ["scripture-collection/abraham"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "abraham1",
} as const satisfies ScripturePassage
