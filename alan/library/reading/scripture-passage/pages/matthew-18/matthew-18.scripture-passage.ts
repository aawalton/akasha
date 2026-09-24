import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const matthew18 = {
  id: "01a06804-11af-7031-94f0-c6a4949b4fda",
  type: "page-type/scripture-passage",
  slug: "matthew-18",
  title: "Matthew 18",
  partOfCollections: ["scripture-collection/matthew"],
  book: "Matthew",
  position: 18,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "matthew18",
} as const satisfies ScripturePassage
