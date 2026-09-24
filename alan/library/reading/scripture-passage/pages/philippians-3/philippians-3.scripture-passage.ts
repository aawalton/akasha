import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const philippians3 = {
  id: "01a06804-11b0-7005-afb0-9d563c7550ee",
  type: "page-type/scripture-passage",
  slug: "philippians-3",
  title: "Philippians 3",
  partOfCollections: ["scripture-collection/philippians"],
  book: "Philippians",
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "philippians3",
} as const satisfies ScripturePassage
