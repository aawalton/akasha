import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const hebrews11 = {
  id: "01a06804-11ad-7049-8546-829f775553bb",
  type: "page-type/scripture-passage",
  slug: "hebrews-11",
  title: "Hebrews 11",
  partOfCollections: ["scripture-collection/hebrews"],
  book: "Hebrews",
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "hebrews11",
} as const satisfies ScripturePassage
