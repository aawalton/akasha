import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const matthew3 = {
  id: "01a06804-11af-703d-a04f-c06e33c1151b",
  type: "page-type/scripture-passage",
  slug: "matthew-3",
  title: "Matthew 3",
  partOfCollections: ["scripture-collection/matthew"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "matthew3",
} as const satisfies ScripturePassage
