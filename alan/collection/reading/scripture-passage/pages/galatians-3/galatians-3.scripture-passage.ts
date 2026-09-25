import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const galatians3 = {
  id: "01a06804-11ad-700c-9b26-7159ab263d24",
  type: "page-type/scripture-passage",
  slug: "galatians-3",
  title: "Galatians 3",
  partOfCollections: ["scripture-collection/galatians"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "galatians3",
} as const satisfies ScripturePassage
