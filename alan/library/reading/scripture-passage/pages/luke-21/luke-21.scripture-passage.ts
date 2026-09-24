import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const luke21 = {
  id: "01a06804-11af-7009-94ee-9d7c76874748",
  type: "page-type/scripture-passage",
  slug: "luke-21",
  title: "Luke 21",
  partOfCollections: ["scripture-collection/luke"],
  book: "Luke",
  position: 21,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "luke21",
} as const satisfies ScripturePassage
