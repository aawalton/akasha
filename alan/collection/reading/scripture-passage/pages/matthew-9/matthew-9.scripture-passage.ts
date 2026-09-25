import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const matthew9 = {
  id: "01a06804-11af-7043-855e-d57afd223f01",
  type: "page-type/scripture-passage",
  slug: "matthew-9",
  title: "Matthew 9",
  partOfCollections: ["scripture-collection/matthew"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "matthew9",
} as const satisfies ScripturePassage
