import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage1John5 = {
  id: "01a06804-11a8-7031-9538-791cd351eb0e",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-1-john-5",
  title: "1 John 5",
  partOfCollections: ["scripture-collection/scripture-collection-1-john"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1john5",
} as const satisfies ScripturePassage
