import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage2Peter3 = {
  id: "01a06804-11aa-701d-b11e-c7f5f90ef00b",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-2-peter-3",
  title: "2 Peter 3",
  partOfCollections: ["scripture-collection/scripture-collection-2-peter"],
  book: "2 Peter",
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "2peter3",
} as const satisfies ScripturePassage
