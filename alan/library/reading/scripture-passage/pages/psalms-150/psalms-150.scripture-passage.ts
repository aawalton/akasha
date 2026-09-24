import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const psalms150 = {
  id: "01a06804-11b0-705d-83c3-f804c8c2e8c5",
  type: "page-type/scripture-passage",
  slug: "psalms-150",
  title: "Psalms 150",
  partOfCollections: ["scripture-collection/psalms"],
  position: 150,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "psalms150",
} as const satisfies ScripturePassage
