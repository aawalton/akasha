import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const psalms25 = {
  id: "01a06804-11b0-7067-ac99-fbfb6c00e168",
  type: "page-type/scripture-passage",
  slug: "psalms-25",
  title: "Psalms 25",
  partOfCollections: ["scripture-collection/psalms"],
  book: "Psalms",
  position: 25,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "psalms25",
} as const satisfies ScripturePassage
