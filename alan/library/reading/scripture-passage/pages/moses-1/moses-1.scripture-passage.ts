import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const moses1 = {
  id: "01a06804-11af-704b-a0e6-5281e088c3cd",
  type: "page-type/scripture-passage",
  slug: "moses-1",
  title: "Moses 1",
  partOfCollections: ["scripture-collection/moses"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "moses1",
} as const satisfies ScripturePassage
