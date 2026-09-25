import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage1Peter4 = {
  id: "01a06804-11a9-7014-bdae-fbad3405c398",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-1-peter-4",
  title: "1 Peter 4",
  partOfCollections: ["scripture-collection/scripture-collection-1-peter"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1peter4",
} as const satisfies ScripturePassage
