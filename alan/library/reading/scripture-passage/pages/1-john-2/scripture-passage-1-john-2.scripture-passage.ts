import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage1John2 = {
  id: "01a06804-11a8-702e-8453-db1466341c5e",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-1-john-2",
  title: "1 John 2",
  partOfCollections: ["scripture-collection/scripture-collection-1-john"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1john2",
} as const satisfies ScripturePassage
