import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const james4 = {
  id: "01a06804-11ad-70a7-b7fc-34a31820639d",
  type: "page-type/scripture-passage",
  slug: "james-4",
  title: "James 4",
  partOfCollections: ["scripture-collection/james"],
  book: "James",
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "james4",
} as const satisfies ScripturePassage
