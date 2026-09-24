import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const galatians1 = {
  id: "01a06804-11ad-700a-b545-8da736a88c5d",
  type: "page-type/scripture-passage",
  slug: "galatians-1",
  title: "Galatians 1",
  partOfCollections: ["scripture-collection/galatians"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "galatians1",
} as const satisfies ScripturePassage
