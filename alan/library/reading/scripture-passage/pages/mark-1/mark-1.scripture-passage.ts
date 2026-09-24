import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const mark1 = {
  id: "01a06804-11af-7018-ab82-71c7cab65a16",
  type: "page-type/scripture-passage",
  slug: "mark-1",
  title: "Mark 1",
  partOfCollections: ["scripture-collection/mark"],
  book: "Mark",
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "mark1",
} as const satisfies ScripturePassage
