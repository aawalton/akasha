import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage2Timothy1 = {
  id: "01a06804-11aa-7039-a384-6789d661639a",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-2-timothy-1",
  title: "2 Timothy 1",
  partOfCollections: ["scripture-collection/scripture-collection-2-timothy"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "2timothy1",
} as const satisfies ScripturePassage
