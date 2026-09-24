import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const genesis3 = {
  id: "01a06804-11ad-7026-8418-3dfde6a06338",
  type: "page-type/scripture-passage",
  slug: "genesis-3",
  title: "Genesis 3",
  partOfCollections: ["scripture-collection/genesis"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "genesis3",
} as const satisfies ScripturePassage
