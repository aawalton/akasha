import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const genesis2 = {
  id: "01a06804-11ad-701b-b0aa-0dfd602bf35d",
  type: "page-type/scripture-passage",
  slug: "genesis-2",
  title: "Genesis 2",
  partOfCollections: ["scripture-collection/genesis"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "genesis2",
} as const satisfies ScripturePassage
