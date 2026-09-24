import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const romans4 = {
  id: "01a06804-11b1-702e-98ff-3c7f4a1d8f46",
  type: "page-type/scripture-passage",
  slug: "romans-4",
  title: "Romans 4",
  partOfCollections: ["scripture-collection/romans"],
  book: "Romans",
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "romans4",
} as const satisfies ScripturePassage
