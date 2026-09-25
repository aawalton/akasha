import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const matthew25 = {
  id: "01a06804-11af-7039-965b-591a10998e7b",
  type: "page-type/scripture-passage",
  slug: "matthew-25",
  title: "Matthew 25",
  partOfCollections: ["scripture-collection/matthew"],
  position: 25,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "matthew25",
} as const satisfies ScripturePassage
