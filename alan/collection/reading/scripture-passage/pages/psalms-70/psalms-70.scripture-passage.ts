import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const psalms70 = {
  id: "01a06804-11b0-7099-b94f-670ed1f554a6",
  type: "page-type/scripture-passage",
  slug: "psalms-70",
  title: "Psalms 70",
  partOfCollections: ["scripture-collection/psalms"],
  position: 70,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "psalms70",
} as const satisfies ScripturePassage
