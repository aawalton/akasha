import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const revelation13 = {
  id: "01a06804-11b1-7012-b0fb-1455450f7c42",
  type: "page-type/scripture-passage",
  slug: "revelation-13",
  title: "Revelation 13",
  partOfCollections: ["scripture-collection/revelation"],
  position: 13,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "revelation13",
} as const satisfies ScripturePassage
