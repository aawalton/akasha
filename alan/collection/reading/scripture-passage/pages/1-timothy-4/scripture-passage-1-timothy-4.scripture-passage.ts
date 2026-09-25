import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage1Timothy4 = {
  id: "01a06804-11a9-703d-aa8c-a039888a92df",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-1-timothy-4",
  title: "1 Timothy 4",
  partOfCollections: ["scripture-collection/scripture-collection-1-timothy"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1timothy4",
} as const satisfies ScripturePassage
