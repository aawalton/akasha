import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const joel1 = {
  id: "01a06804-11ae-705f-9e4b-7aeaf072d2fd",
  type: "page-type/scripture-passage",
  slug: "joel-1",
  title: "Joel 1",
  partOfCollections: ["scripture-collection/joel"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "joel1",
} as const satisfies ScripturePassage
