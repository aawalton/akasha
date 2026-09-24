import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const revelation22 = {
  id: "01a06804-11b1-701c-af2e-f95450616ad1",
  type: "page-type/scripture-passage",
  slug: "revelation-22",
  title: "Revelation 22",
  partOfCollections: ["scripture-collection/revelation"],
  position: 22,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "revelation22",
} as const satisfies ScripturePassage
