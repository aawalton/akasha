import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const revelation5 = {
  id: "01a06804-11b1-701f-a6f8-c70fe323f1fa",
  type: "page-type/scripture-passage",
  slug: "revelation-5",
  title: "Revelation 5",
  partOfCollections: ["scripture-collection/revelation"],
  book: "Revelation",
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "revelation5",
} as const satisfies ScripturePassage
