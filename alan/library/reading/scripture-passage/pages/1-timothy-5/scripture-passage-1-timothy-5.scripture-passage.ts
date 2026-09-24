import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage1Timothy5 = {
  id: "01a06804-11a9-703e-a8a5-08c75573d9fb",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-1-timothy-5",
  title: "1 Timothy 5",
  partOfCollections: ["scripture-collection/scripture-collection-1-timothy"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1timothy5",
} as const satisfies ScripturePassage
