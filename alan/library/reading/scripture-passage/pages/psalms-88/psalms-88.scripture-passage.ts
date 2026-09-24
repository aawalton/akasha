import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const psalms88 = {
  id: "01a06804-11b1-7001-a891-a7719a8314db",
  type: "page-type/scripture-passage",
  slug: "psalms-88",
  title: "Psalms 88",
  partOfCollections: ["scripture-collection/psalms"],
  book: "Psalms",
  position: 88,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "psalms88",
} as const satisfies ScripturePassage
