import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage1Samuel5 = {
  id: "01a06804-11a9-7030-bdf9-68d777d35c7f",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-1-samuel-5",
  title: "1 Samuel 5",
  partOfCollections: ["scripture-collection/scripture-collection-1-samuel"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1samuel5",
} as const satisfies ScripturePassage
