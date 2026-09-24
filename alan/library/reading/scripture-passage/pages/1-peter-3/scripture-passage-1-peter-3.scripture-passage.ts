import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage1Peter3 = {
  id: "01a06804-11a9-7013-b21d-f778d1c49d7d",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-1-peter-3",
  title: "1 Peter 3",
  partOfCollections: ["scripture-collection/scripture-collection-1-peter"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1peter3",
} as const satisfies ScripturePassage
