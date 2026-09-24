import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage1Corinthians1 = {
  id: "01a06804-11a8-701d-affd-1e75592d6338",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-1-corinthians-1",
  title: "1 Corinthians 1",
  partOfCollections: ["scripture-collection/scripture-collection-1-corinthians"],
  book: "1 Corinthians",
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1corinthians1",
} as const satisfies ScripturePassage
