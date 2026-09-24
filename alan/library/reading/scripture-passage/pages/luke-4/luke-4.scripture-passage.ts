import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const luke4 = {
  id: "01a06804-11af-700e-9cdb-145fc3314bcf",
  type: "page-type/scripture-passage",
  slug: "luke-4",
  title: "Luke 4",
  partOfCollections: ["scripture-collection/luke"],
  book: "Luke",
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "luke4",
} as const satisfies ScripturePassage
