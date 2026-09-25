import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage1John3 = {
  id: "01a06804-11a8-702f-98d1-12e353a90925",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-1-john-3",
  title: "1 John 3",
  partOfCollections: ["scripture-collection/scripture-collection-1-john"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1john3",
} as const satisfies ScripturePassage
