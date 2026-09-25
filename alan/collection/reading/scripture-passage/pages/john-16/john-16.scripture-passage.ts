import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const john16 = {
  id: "01a06804-11ae-7069-91c6-d29debbf3c07",
  type: "page-type/scripture-passage",
  slug: "john-16",
  title: "John 16",
  partOfCollections: ["scripture-collection/john"],
  position: 16,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "john16",
} as const satisfies ScripturePassage
