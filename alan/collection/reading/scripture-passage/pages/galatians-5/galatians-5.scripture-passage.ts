import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const galatians5 = {
  id: "01a06804-11ad-700e-9740-d4bf97efc617",
  type: "page-type/scripture-passage",
  slug: "galatians-5",
  title: "Galatians 5",
  partOfCollections: ["scripture-collection/galatians"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "galatians5",
} as const satisfies ScripturePassage
