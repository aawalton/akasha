import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const james3 = {
  id: "01a06804-11ad-70a6-b599-71bfe8323a95",
  type: "page-type/scripture-passage",
  slug: "james-3",
  title: "James 3",
  partOfCollections: ["scripture-collection/james"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "james3",
} as const satisfies ScripturePassage
