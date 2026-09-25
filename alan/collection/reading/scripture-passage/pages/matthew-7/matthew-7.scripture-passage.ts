import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const matthew7 = {
  id: "01a06804-11af-7041-84a4-856905c760e0",
  type: "page-type/scripture-passage",
  slug: "matthew-7",
  title: "Matthew 7",
  partOfCollections: ["scripture-collection/matthew"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "matthew7",
} as const satisfies ScripturePassage
