import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage1Timothy1 = {
  id: "01a06804-11a9-703a-8211-a7af201732fd",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-1-timothy-1",
  title: "1 Timothy 1",
  partOfCollections: ["scripture-collection/scripture-collection-1-timothy"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1timothy1",
} as const satisfies ScripturePassage
