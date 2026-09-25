import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const psalms105 = {
  id: "01a06804-11b0-702c-9efb-0a4f17e3dd42",
  type: "page-type/scripture-passage",
  slug: "psalms-105",
  title: "Psalms 105",
  partOfCollections: ["scripture-collection/psalms"],
  position: 105,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "psalms105",
} as const satisfies ScripturePassage
