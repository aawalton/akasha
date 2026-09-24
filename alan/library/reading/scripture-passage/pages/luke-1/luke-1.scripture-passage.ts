import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const luke1 = {
  id: "01a06804-11ae-70cb-b718-388455567225",
  type: "page-type/scripture-passage",
  slug: "luke-1",
  title: "Luke 1",
  partOfCollections: ["scripture-collection/luke"],
  book: "Luke",
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "luke1",
} as const satisfies ScripturePassage
