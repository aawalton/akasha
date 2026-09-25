import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const revelation21 = {
  id: "01a06804-11b1-701b-8af7-1a5c86ac166a",
  type: "page-type/scripture-passage",
  slug: "revelation-21",
  title: "Revelation 21",
  partOfCollections: ["scripture-collection/revelation"],
  position: 21,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "revelation21",
} as const satisfies ScripturePassage
