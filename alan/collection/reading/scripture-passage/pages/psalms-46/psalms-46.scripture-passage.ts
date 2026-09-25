import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const psalms46 = {
  id: "01a06804-11b0-707e-8119-cd8e021b53b7",
  type: "page-type/scripture-passage",
  slug: "psalms-46",
  title: "Psalms 46",
  partOfCollections: ["scripture-collection/psalms"],
  position: 46,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "psalms46",
} as const satisfies ScripturePassage
