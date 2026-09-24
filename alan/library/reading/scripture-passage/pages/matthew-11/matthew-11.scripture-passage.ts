import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const matthew11 = {
  id: "01a06804-11af-702a-9889-6677c05e1fde",
  type: "page-type/scripture-passage",
  slug: "matthew-11",
  title: "Matthew 11",
  partOfCollections: ["scripture-collection/matthew"],
  book: "Matthew",
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "matthew11",
} as const satisfies ScripturePassage
