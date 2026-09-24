import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const psalms121 = {
  id: "01a06804-11b0-703e-b2e2-466cac58651b",
  type: "page-type/scripture-passage",
  slug: "psalms-121",
  title: "Psalms 121",
  partOfCollections: ["scripture-collection/psalms"],
  book: "Psalms",
  position: 121,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "psalms121",
} as const satisfies ScripturePassage
