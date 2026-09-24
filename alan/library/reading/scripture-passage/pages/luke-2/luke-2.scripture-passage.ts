import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const luke2 = {
  id: "01a06804-11af-7007-bfd1-e8b689ce082f",
  type: "page-type/scripture-passage",
  slug: "luke-2",
  title: "Luke 2",
  partOfCollections: ["scripture-collection/luke"],
  book: "Luke",
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "luke2",
} as const satisfies ScripturePassage
