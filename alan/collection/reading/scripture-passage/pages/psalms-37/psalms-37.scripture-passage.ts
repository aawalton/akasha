import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const psalms37 = {
  id: "01a06804-11b0-7074-875c-54863e3385df",
  type: "page-type/scripture-passage",
  slug: "psalms-37",
  title: "Psalms 37",
  partOfCollections: ["scripture-collection/psalms"],
  position: 37,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "psalms37",
} as const satisfies ScripturePassage
