import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const genesis5 = {
  id: "01a06804-11ad-703c-afe2-7cc1624a1f43",
  type: "page-type/scripture-passage",
  slug: "genesis-5",
  title: "Genesis 5",
  partOfCollections: ["scripture-collection/genesis"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "genesis5",
} as const satisfies ScripturePassage
