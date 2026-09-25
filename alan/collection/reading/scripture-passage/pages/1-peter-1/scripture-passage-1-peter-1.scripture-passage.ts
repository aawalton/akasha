import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage1Peter1 = {
  id: "01a06804-11a9-7011-979f-c7cfcee98e15",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-1-peter-1",
  title: "1 Peter 1",
  partOfCollections: ["scripture-collection/scripture-collection-1-peter"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1peter1",
} as const satisfies ScripturePassage
