import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const psalms50 = {
  id: "01a06804-11b0-7083-82af-bc8759705b20",
  type: "page-type/scripture-passage",
  slug: "psalms-50",
  title: "Psalms 50",
  partOfCollections: ["scripture-collection/psalms"],
  position: 50,
  ownLength: 0,
  ownProgress: 0,
  status: "not-started",
  externalId: "psalms50",
} as const satisfies ScripturePassage
