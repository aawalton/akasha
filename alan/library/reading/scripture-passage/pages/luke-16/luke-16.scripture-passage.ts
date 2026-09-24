import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const luke16 = {
  id: "01a06804-11af-7003-a587-86b465db024e",
  type: "page-type/scripture-passage",
  slug: "luke-16",
  title: "Luke 16",
  partOfCollections: ["scripture-collection/luke"],
  book: "Luke",
  position: 16,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "luke16",
} as const satisfies ScripturePassage
