import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage1Samuel1 = {
  id: "01a06804-11a9-7016-adfb-0197adf4aad0",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-1-samuel-1",
  title: "1 Samuel 1",
  partOfCollections: ["scripture-collection/scripture-collection-1-samuel"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1samuel1",
} as const satisfies ScripturePassage
