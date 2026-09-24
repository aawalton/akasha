import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage1Timothy3 = {
  id: "01a06804-11a9-703c-a827-425ce3a99620",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-1-timothy-3",
  title: "1 Timothy 3",
  partOfCollections: ["scripture-collection/scripture-collection-1-timothy"],
  book: "1 Timothy",
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1timothy3",
} as const satisfies ScripturePassage
