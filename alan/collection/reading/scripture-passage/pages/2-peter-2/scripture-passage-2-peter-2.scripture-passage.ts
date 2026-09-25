import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage2Peter2 = {
  id: "01a06804-11aa-701c-b74c-18b401fc7013",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-2-peter-2",
  title: "2 Peter 2",
  partOfCollections: ["scripture-collection/scripture-collection-2-peter"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "2peter2",
} as const satisfies ScripturePassage
