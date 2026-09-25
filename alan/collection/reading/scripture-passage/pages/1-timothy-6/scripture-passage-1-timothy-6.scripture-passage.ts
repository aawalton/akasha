import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage1Timothy6 = {
  id: "01a06804-11a9-703f-b92d-29f4cbaf5dc3",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-1-timothy-6",
  title: "1 Timothy 6",
  partOfCollections: ["scripture-collection/scripture-collection-1-timothy"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1timothy6",
} as const satisfies ScripturePassage
