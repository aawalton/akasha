import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const psalms99 = {
  id: "01a06804-11b1-700d-a893-8b64976438ab",
  type: "page-type/scripture-passage",
  slug: "psalms-99",
  title: "Psalms 99",
  partOfCollections: ["scripture-collection/psalms"],
  position: 99,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "psalms99",
} as const satisfies ScripturePassage
