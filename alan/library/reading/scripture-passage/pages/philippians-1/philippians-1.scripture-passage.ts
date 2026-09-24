import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const philippians1 = {
  id: "01a06804-11b0-7003-b015-63d49cde664e",
  type: "page-type/scripture-passage",
  slug: "philippians-1",
  title: "Philippians 1",
  partOfCollections: ["scripture-collection/philippians"],
  book: "Philippians",
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "philippians1",
} as const satisfies ScripturePassage
