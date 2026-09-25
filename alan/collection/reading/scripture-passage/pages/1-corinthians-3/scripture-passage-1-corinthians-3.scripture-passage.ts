import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage1Corinthians3 = {
  id: "01a06804-11a8-7026-8407-3bdc298e6906",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-1-corinthians-3",
  title: "1 Corinthians 3",
  partOfCollections: ["scripture-collection/scripture-collection-1-corinthians"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1corinthians3",
} as const satisfies ScripturePassage
