import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const psalms85 = {
  id: "01a06804-11b0-70a9-a09b-aacd8469610a",
  type: "page-type/scripture-passage",
  slug: "psalms-85",
  title: "Psalms 85",
  partOfCollections: ["scripture-collection/psalms"],
  book: "Psalms",
  position: 85,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "psalms85",
} as const satisfies ScripturePassage
