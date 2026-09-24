import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage1Corinthians2 = {
  id: "01a06804-11a8-7025-93e7-ce2e8d67e1c4",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-1-corinthians-2",
  title: "1 Corinthians 2",
  partOfCollections: ["scripture-collection/scripture-collection-1-corinthians"],
  book: "1 Corinthians",
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1corinthians2",
} as const satisfies ScripturePassage
