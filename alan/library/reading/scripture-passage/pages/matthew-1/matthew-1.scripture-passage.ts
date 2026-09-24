import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const matthew1 = {
  id: "01a06804-11af-7028-8696-537edf646114",
  type: "page-type/scripture-passage",
  slug: "matthew-1",
  title: "Matthew 1",
  partOfCollections: ["scripture-collection/matthew"],
  book: "Matthew",
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "matthew1",
} as const satisfies ScripturePassage
