import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const luke12 = {
  id: "01a06804-11ae-70ce-937d-abca865041cc",
  type: "page-type/scripture-passage",
  slug: "luke-12",
  title: "Luke 12",
  partOfCollections: ["scripture-collection/luke"],
  book: "Luke",
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "luke12",
} as const satisfies ScripturePassage
