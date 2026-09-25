import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage1John1 = {
  id: "01a06804-11a8-702d-868e-8a12d69bc388",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-1-john-1",
  title: "1 John 1",
  partOfCollections: ["scripture-collection/scripture-collection-1-john"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1john1",
} as const satisfies ScripturePassage
