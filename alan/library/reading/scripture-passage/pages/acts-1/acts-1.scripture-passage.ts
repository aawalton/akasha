import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const acts1 = {
  id: "01a06804-11aa-7043-b3dd-5dbc7d427486",
  type: "page-type/scripture-passage",
  slug: "acts-1",
  title: "Acts 1",
  partOfCollections: ["scripture-collection/acts"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "acts1",
} as const satisfies ScripturePassage
