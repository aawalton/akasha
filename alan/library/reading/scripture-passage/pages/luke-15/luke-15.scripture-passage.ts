import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const luke15 = {
  id: "01a06804-11af-7002-9c29-eb96180c6f9e",
  type: "page-type/scripture-passage",
  slug: "luke-15",
  title: "Luke 15",
  partOfCollections: ["scripture-collection/luke"],
  book: "Luke",
  position: 15,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "luke15",
} as const satisfies ScripturePassage
