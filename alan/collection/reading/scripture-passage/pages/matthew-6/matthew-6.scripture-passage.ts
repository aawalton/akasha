import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const matthew6 = {
  id: "01a06804-11af-7040-8031-4841e9c11caa",
  type: "page-type/scripture-passage",
  slug: "matthew-6",
  title: "Matthew 6",
  partOfCollections: ["scripture-collection/matthew"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "matthew6",
} as const satisfies ScripturePassage
