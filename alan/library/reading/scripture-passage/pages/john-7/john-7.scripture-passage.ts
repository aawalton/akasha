import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const john7 = {
  id: "01a06804-11ae-7074-95fb-58a615c18700",
  type: "page-type/scripture-passage",
  slug: "john-7",
  title: "John 7",
  partOfCollections: ["scripture-collection/john"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "john7",
} as const satisfies ScripturePassage
