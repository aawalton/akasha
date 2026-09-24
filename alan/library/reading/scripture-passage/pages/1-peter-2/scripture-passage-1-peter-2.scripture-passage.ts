import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage1Peter2 = {
  id: "01a06804-11a9-7012-9c21-b8747540269d",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-1-peter-2",
  title: "1 Peter 2",
  partOfCollections: ["scripture-collection/scripture-collection-1-peter"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1peter2",
} as const satisfies ScripturePassage
