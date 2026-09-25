import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const james1 = {
  id: "01a06804-11ad-70a4-8e81-1cb20747c692",
  type: "page-type/scripture-passage",
  slug: "james-1",
  title: "James 1",
  partOfCollections: ["scripture-collection/james"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "james1",
} as const satisfies ScripturePassage
