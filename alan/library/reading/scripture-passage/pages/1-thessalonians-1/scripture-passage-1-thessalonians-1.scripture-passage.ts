import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage1Thessalonians1 = {
  id: "01a06804-11a9-7035-9dec-af975e068028",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-1-thessalonians-1",
  title: "1 Thessalonians 1",
  partOfCollections: ["scripture-collection/scripture-collection-1-thessalonians"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1thessalonians1",
} as const satisfies ScripturePassage
