import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const moses5 = {
  id: "01a06804-11af-704f-8ecc-62598dab12ad",
  type: "page-type/scripture-passage",
  slug: "moses-5",
  title: "Moses 5",
  partOfCollections: ["scripture-collection/moses"],
  book: "Moses",
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "moses5",
} as const satisfies ScripturePassage
