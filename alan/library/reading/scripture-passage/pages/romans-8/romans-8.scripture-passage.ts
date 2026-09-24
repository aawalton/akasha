import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const romans8 = {
  id: "01a06804-11b1-7032-84a4-f1742880e2b3",
  type: "page-type/scripture-passage",
  slug: "romans-8",
  title: "Romans 8",
  partOfCollections: ["scripture-collection/romans"],
  book: "Romans",
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "romans8",
} as const satisfies ScripturePassage
